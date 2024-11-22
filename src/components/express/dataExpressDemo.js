import React from 'react'
import {Expand} from '../entry/Expand'
import {CodeBlock, dracula} from 'react-code-blocks'
import { nanoid } from 'nanoid'
import {TextBlock} from '../entry/LongEntry'

const unityFormat = [{
    key: nanoid(),
    text: ` Because of gameplay reasons (portentious), the solver focuses on hands with 13 tiles, even though 14 tiles are needed to finish your hand. This is because depending on if you're waiting on a single tile or multiple, the scoring changes. So treating the hand as 13 by default makes the score computation easier. Following the files that deal with game logic you're led to LogicalHand.cs:checkThirteenTenpai.`,
    highlight:'LogicalHand.cs:checkThirteenTenpai',
    language:'csharp',
    code:`public List<MahjongTileData> checkThirteenTenpai(List<MahjongTileData> list)
{
    //There are only 5 possible cases for tenpai with 13 tiles.
    //Case 1: 3 complete melds, 1 pair, and 2 adjacent or identical tiles. 
    //Case 2: 4 complete melds, 1 tile waiting for pair
    //Case 3: 6 pairs, 1 tile waiting for pair
    //Case 4: 13 orphans, waiting for one more orphan
    //Case 5: 12 orphans with one pair of orphans, waiting for the last orphan. 

    //Case 1 & 2
    var suits = list.GroupBy(i => i.suit)
                            .Select(grp => grp.ToList())
                            .ToList();
    int melds_found = 0;
    List<MahjongTileData> tile_temp = new List<MahjongTileData>(list);
    //tile_temp = list;
    foreach (var suit in suits)
    {
        melds_found += findAndRemoveMaxTriplesAndStraights(ref tile_temp, suit, suit.Count() / 3);
        //Debug.Log(melds_found);
    }

    if (melds_found == 4)
        return tile_temp;
    else if (melds_found == 3 && findPair(ref tile_temp) && lastTwoTilesPartialMeld(ref tile_temp))
        return tile_temp;

    // Case 3 
    var debug_temp = list.GroupBy(x => x).Where(y => y.Count() >= 2).ToList();
    if(debug_temp.Count() == 6)
    {
        // TODO: Fix this, or rather, figure out why this was broken in the first place
        var debug_temp_2 = list.GroupBy(x => x).Where(y => y.Count() == 1).FirstOrDefault();
        if(debug_temp_2 != null)
            return debug_temp_2.ToList();
        else return null;
    }
    // Case 4: 
    var temp_hand = new LogicalHand("b1 b9 c1 c9 m1 m9 we ws ww wn dw dg dr");
    List<MahjongTileData> koku = temp_hand.tiles;
    if (koku.Except(list).Count() == 0)
        return list;

    // Case 5:
    if (list.Except(koku).Count() == 0 && list.GroupBy(x => x).Where(y => y.Count() == 2).Count() == 1)
        return list.Distinct().ToList();


    return null;
    }`
},

{
    key: nanoid(),
    text:`Admittedly, it's not great. But for code I dismissed as shoddy legacy code, it's organized and somewhat readable. Doesn't state what is returned. By inference it returns the last set of tiles that are waiting to be finished. It has some funny names like findAndRemoveMaxTriplesAndStraights, let's take a look..`,
    highlight:`findAndRemoveMaxTriplesAndStraights`,
    language:`csharp`,
    code:`int findAndRemoveMaxTriplesAndStraights(ref List<MahjongTileData> full_tiles, List<MahjongTileData> suit_tiles, int max_melds)
    {
    //this function takes a list of suited tiles and tries to find the maximum number of melds (triples and straights). 
    //it also removes the maximum number of melds from a list of tiles provided, tiles_temp.
    int desired_triples = 0;
    int desired_straights = 0;
    int maximum_melds_found = 0;
    bool old_pair_remains = false;
    bool pair_remains = false;

    //Debug.Log("looking for " + max_melds + "max_melds in " + direction + " " + suit_tiles_temp.FirstOrDefault().suit.ToString() );


    List<MahjongTileData> full_tiles_temp = new List<MahjongTileData>(full_tiles);

    for(int i = 0; i <= max_melds; i++)
    {
        desired_triples = i;
        desired_straights = max_melds - i;
        int melds_found = 0;

        List<MahjongTileData> suit_tiles_temp = new List<MahjongTileData> (suit_tiles);

        melds_found = findTriplesAndStraights(suit_tiles_temp, desired_triples, desired_straights, ref pair_remains);

        if(melds_found > maximum_melds_found || (melds_found == maximum_melds_found && old_pair_remains == false && pair_remains == true))
        {
            maximum_melds_found = melds_found;
            full_tiles_temp = new List<MahjongTileData>(full_tiles);
            suit_tiles_temp = new List<MahjongTileData>(suit_tiles);
            //Debug.Log("full_tiles_temp length: " + full_tiles_temp.Count());
            findAndRemoveTriplesAndStraightsFromTiles(ref full_tiles_temp, suit_tiles_temp, desired_triples, desired_straights);
            old_pair_remains = pair_remains;
            pair_remains = false;
            //Debug.Log("full_tiles_temp length after: " + full_tiles_temp.Count());
        }
    }


    full_tiles = full_tiles_temp;

    //Debug.Log("found " + suited maximum_melds_found);
    return maximum_melds_found;`
},

{
    key: nanoid(),
    text:`It takes the approach of trying to remove as many straights or triples as it can from the list of tiles, which is somewhat prone to access faults as a list of the original tiles and the packaged 'melds' has to be maintained. Again, not necessarily bad but could be confusing. But most of the work seems like it's done by findTriplesAndStraights..`,
    highlight:`findTriplesAndStraights`,
    language:`csharp`,
    code:`int findTriplesAndStraights(List<MahjongTileData> suit_tiles_temp, int desired_triples, int desired_straights, ref bool pair_remains)
{
int melds_found = 0;

var all_potential_triples = suit_tiles_temp.GroupBy(x => x).Where(g => g.Count() >= 3).Select(y => y.Key).ToList();
MahjongTileData removed_triple;

if(desired_triples == 1 && (all_potential_triples.Count == 2 || all_potential_triples.Count == 3))
{
    int melds_found_temp = 0;
    for(int k = 0; k < all_potential_triples.Count; k++)
    {
        melds_found_temp = findStraightsAndOneTripleFromMany(suit_tiles_temp, desired_triples, desired_straights, all_potential_triples, k);

        if(melds_found_temp > melds_found)
        {
            melds_found = melds_found_temp;
            triple_index = k;
        }
    }
}

else if (desired_triples == 2 && (all_potential_triples.Count == 3))
{
    int melds_found_temp = 0;
    for(int k = 0; k < all_potential_triples.Count; k++)
    {
        melds_found_temp = findStraightsAndTwoTriplesFromMany(suit_tiles_temp, desired_triples, desired_straights, all_potential_triples, k);

        if(melds_found_temp > melds_found)
        {
            melds_found = melds_found_temp;
            triple_index = k;
        }
    }
}

else
{
    for(int k = 0; k < desired_triples; k++)
    {
        for(int j = 0; j < suit_tiles_temp.Count(); j++)
        {
            if(suit_tiles_temp.Where(x => x == suit_tiles_temp[j]).Count() >= 3)
            {
                //found a triple, remove them
                MahjongTileData temp = suit_tiles_temp[j];
                suit_tiles_temp.Remove(temp); //remove 3 specifically.
                suit_tiles_temp.Remove(temp);
                suit_tiles_temp.Remove(temp);
                melds_found++;
            }
        }
    }

    for(int k = 0; k < desired_straights; k++) //look for k straights
    {
        for(int j = 0; j < suit_tiles_temp.Count(); j++) //look for adjacent tiles around j
        {
            if(suit_tiles_temp[j].val >= TileValue.two && suit_tiles_temp[j].val <= TileValue.eight && !suit_tiles_temp[j].isHonor())
            {
                MahjongTileData lower = new MahjongTileData(suit_tiles_temp[j].toInt() - 1);
                MahjongTileData higher = new MahjongTileData(suit_tiles_temp[j].toInt() + 1);
                if(suit_tiles_temp.Contains(lower) && suit_tiles_temp.Contains(higher))
                {
                    //found a straight, remove them
                    MahjongTileData temp = suit_tiles_temp[j];

                    suit_tiles_temp.Remove(lower);
                    suit_tiles_temp.Remove(higher);
                    suit_tiles_temp.Remove(temp);

                    j = 0;
                    melds_found++;
                }
            }
        }
    }
}

if (suit_tiles_temp.Distinct().Count() < suit_tiles_temp.Count())
    pair_remains = true;

return melds_found;
}`
},
];

const csFormat = [ {
    text:``,
    highlight:``,
    language:``,
    code:``
},
{
    text:``,
    highlight:``,
    language:``,
    code:``
},
{
    text:``,
    highlight:``,
    language:``,
    code:``
},
{
    text:``,
    highlight:``,
    language:``,
    code:``
},
];

const jsFormat = [ {
    text:``,
    highlight:``,
    language:``,
    code:``
},
{
    text:``,
    highlight:``,
    language:``,
    code:``
},
{
    text:``,
    highlight:``,
    language:``,
    code:``
},
{
    text:``,
    highlight:``,
    language:``,
    code:``
},
];


const csharp = [
<Expand name={`Okay, 2016 was a 10000 line bust but it had many other priorities like game interface, assets, ad and payment integration, and so on. Let's take a look at "simpleMahjong" meant to keep things simple and maintainable.`}
highlight='simpleMahjong'
content= 
{<>
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='csharp' className='expand--codeblock' text=
{`public IEnumerable<List<PermuGroup>> solve(bool check_tenpai, bool print_potential_hands = false, bool print_groups = false, bool print_solved_hands = false, bool print_orig = false, bool print_waits = false)
{
    //tiles here should be the closed tiles only!
    var all_groups = PermuGroup.getPermuGroups(tiles);
    var pruned_groups = PermuGroup.removeStraightPermuDupes(all_groups, tiles);

    foreach (var meld in melds)
        pruned_groups.Add(meld.toPermuGroup());


    var all_hands = PermuGroup.getPermsOfPermuGroups(pruned_groups, check_tenpai);
    var potential_hands = PermuGroup.removeHandsWithTooManyDuplicateTIles(all_hands);

    IEnumerable<bool> bools;
    if (check_tenpai)
    {
        waits.Clear(); //must clear waits before running tenpai check
        bools = PermuGroup.isTenpaiMany(potential_hands, tiles, melds, waits);
    }
    else 
        bools = PermuGroup.isValidMany(potential_hands, tiles, melds);

    var temp = bools.ToList();
    var valid_or_tenpai = PermuGroup.findValidOrTenpai(potential_hands, bools, waits, !check_tenpai, print_potential_hands, print_solved_hands, print_waits);

    return valid_or_tenpai;
}`}/> </div>
    </div>
    </>}>
</Expand> ,
<Expand name={`Alright that's a lot of flags for debugging but whatever. It is at least, shorter. I don't exactly know what a PermuGroup is, but I suppose bools contains the information on if the hand is valid or tenpai. Like noten, the solver revolves around figuring out if tenpai is possible, but this time we have a useful WaitTiles object. The solving seems to involve making a list of unique tiles and then permutating to get all groups of 3 and then checking if they are melds. Seems excessive but I suppose it'll eventually work.`}
highlight='eventually work'
content= 
{<> 
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='csharp' className='expand--codeblock' text=
{`public static List<PermuGroup> getPermuGroups(List<MahjongTileData> tiles)
{
    List<PermuGroup> potential_group = new List<PermuGroup>();

    //only if straights are completely overlapping should you not shorten the list
    var temp = tiles;
    if (tiles.Count() - 3 < tiles.Distinct().Count())
        temp = tiles.Distinct().ToList();

    //so two overlapping straights gives 8 identical copies of a meld (2*2*2) and three everlapping straights gives 27...

    foreach (var permu in Permutate(temp, 3))
    //foreach (var permu in Permutate(tiles.Distinct().ToList(), 3))   // issues with matching straights
    {
        if (MeldData.isStraight(permu))
            potential_group.Add(new PermuGroup(permu, PermuType.straight));
    }

    var trips = (tiles.GroupBy(x => x).Where(y => y.Count() > 2).Select(z => z)).ToList();
    foreach (var permu in trips)
    {
        // an undeclared kan cannot actually be a kan, you won't have enough tiles to win
        potential_group.Add(new PermuGroup(permu.ToList().GetRange(0, 3), PermuType.triple));
    }

    foreach (var permu in Permutate(tiles, 2))
    {
        if (MeldData.isPair(permu))
            potential_group.Add(new PermuGroup(permu, PermuType.pair));
    }

    return potential_group;
}`}/> </div>
    </div>
    </>}>
</Expand> ,
<Expand name={`Finally isTenpai takes the list of PermuGroups and then checks if all the groups in PermuGroup are either melds or one away from a meld. `}
highlight='isTenpai'
content= 
{<> Components can import modules they need and export themselves at the bottom of their files. 
    A simple component looks like this: 
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`public static bool isTenpai(List<PermuGroup> groups, List<MahjongTileData> tiles, List<WaitTile> waits)
{
    var list = new List<MahjongTileData>(tiles);
    foreach (var g in groups)
    {
        foreach (var tile in g.list)
        {
            if (!list.Remove(tile))
                return false;
        }
    }

    //once the tiles are removed, the remaining tiles must either be a partial meld or a partial pair
    Debug.Assert(list.Count == 3 || list.Count == 2, " isTenpai failed! list.Count was: " + list.Count);

    if (list.Count == 3)
        if (MeldData.isAlmostMeld(list, waits))
            return true;
        else return false;
    else
    {
        waits.Add(new WaitTile(list[0], list[1], WaitTile.WaitType.pair));
        waits.Add(new WaitTile(list[1], list[0], WaitTile.WaitType.pair));
        return true; // turns out literally any two tiles are an almost pair
    }
}`}/> </div>
    </div>
    </>}
    />,
<TextBlock key={nanoid()} text={`I believe this approach did work better than the overly restrictive method of attempting to remove every different pattern of straights and triples, but takes combinations a little too literally. Also PermuGroup is a misnomer. The real strength of this project is the state machine behind the game which breaks every player action into appropriate types like: chi (steal a tile) left, chi-middle, chi-right to completely determine the game state from the player action instead of having to also convey tile data. `}/>,
]
const javascript = [
<Expand name={`Finally we've arrived at the interface at the top of the page. `}
highlight='top of the page'
content= 
{<>
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function riichi (handStr, printMelds) {
    const tiles = Array.isArray(handStr) ? handStr : handTiles(handStr);
    
    const suits = suitGroups(tiles);
    const melds = suits.map((suit) => getMelds(suit))

    printMelds && console.log('melds from riichi: ', melds);
    if (melds && countMelds(melds) === 4 && countPairs(melds) === 1) return true;
    return false;
}`}/> </div>
    </div>
    </>}>
</Expand> ,
<Expand name={`It's certainly more declarative than previous attempts. Riichi is one of the most common ways of winning mahjong, getting 4 melds and a pair by yourself, or you can steal the last tile. So the function asks, are there melds? Are there 4 melds and 1 pair? Then it's a riichi. But getMelds is hiding something, after all: what really is a meld?`}
highlight='what really is a meld?'
content= 
{<> First of all, a meld has to be the same suit, so suitGroup is a single suit. Inside, there are three cases which all eventually feed into validMelds, which is the real workhorse of riichi.
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function getMelds(suitGroup) {
    const remainder = suitGroup.length % 3;
    if (remainder == 1) return; // no valid options if remainder is 1
    if (remainder == 2) return getMeldsAndPair(suitGroup); // remainder has to be a pair
    if (remainder == 0) return validMelds(suitGroup);
}`}/> </div>
    </div>
    </>}>
</Expand> ,
<TextBlock key={nanoid()} text={`The difficulty mostly comes from different interpretations of tiles. A series like 1,2,3,3,3 could be a straight, a pair, or a triple. Similarly, 567,777,888,66 is ideally 2 triples, a pair and a straight, but could be interpreted as 567,678,678,78, missing the pair. `}/>,
<TextBlock key={nanoid()} text={`The solution I settled on is to remove the pair first and only have validMelds process melds on tile groups that are divisible by 3. Then, make a list of all possible melds, and make combinations of that list that would use all the tiles. These are the "meldsets" towards the end of the validMelds. Finally, confirm that the meldset actually exists by running through the tiles and using splice to take out tiles. `}/>,
<Expand name={`The last part could be optimized since if the valid meldset isn't as long as the input tiles, i.e. not every tile is used in a meld, then the tiles are already not riichi. Anyways, it works well enough for now. `}
highlight='it works well enough for now'
content= 
{<>
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function validMelds(suitGroup) {
// make a list of all possible straights and triples
// make all combinations of melds up to the max amount possible
// check each combination and return the first (for now) largest combination
if(suitGroup.length === 0 ) return [];
const maxMelds = suitGroup.length / 3; // max melds possible
const straights = getCombinations(suitGroup, 3).filter((combi) => isStraight(combi));
const triples = getCombinations(suitGroup, 3).filter((combi) => isTriple(combi));
let uniqueStraights = straights.filter((value, index, self) => 
    index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(value)));
const uniqueTriples = triples.filter((value, index, self) => 
    index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(value)));

// straights may be duplicated, but triples cannot (not enough tiles)
// in this case uniqueStraights will be 1 meld but length is 6. But this is not enough to distinguish 2 identical straights, i.e. straight and triple in the suit
// confirmMelds already provides functionality to check if melds exist in a hand, so skip a few steps and see if two identical melds exist
// index starts with checking 2 identical straights
for(let i = 2; i <= maxMelds; i++) {
    uniqueStraights.forEach((straight, index) => {
        const straightsMeldSet = Array(i).fill(straight);
        if ( confirmMelds(suitGroup, straightsMeldSet)) {
            // if 1+ identical straights are confirmed, add it to the "unique melds". 
            // why this way? so that the identical straight is added to all possible combinations
            for( let j = 0; j < i; j++ )
                uniqueStraights.push(straight); 
        }
    })
}

const possibleMelds = [...uniqueStraights, ...uniqueTriples];
const possibleMeldSets = getAllCombinations(possibleMelds, maxMelds);
const confirmedMeldSets = possibleMeldSets.filter((meldset) => confirmMelds(suitGroup, meldset))
const orderedMeldSets = confirmedMeldSets.sort((msA, msB) => msA.length < msB.length ? 1: -1);

return orderedMeldSets[0] ? orderedMeldSets[0] : [];
}`}/> </div>
    </div>
    </>}>
</Expand> ,
<TextBlock key={nanoid()} text={`The form is a bit messy but generally declarative. Find straights or triples, filter unique straights or triples, make a list of possible melds, confirm that the melds exist, then output the best meldset. `}/>,
<TextBlock key={nanoid()} text={`
One fault of this approach is that two identical straights might actually exist, and it would get filtered out when finding unique straights. They are sheepishly added back in the center for loop. A smarter meld generator or unique meld filter might be a better solution, but the simple filters used in the first 10 lines effectively use the very powerful JS array functions.`}/>
,
<Expand name={`With validMelds and a generous helping of jest unit tests, making this little mahjong API only took a weekend and a bit rather than I think an entire summer in uni to make noten riichi mahjong. Then again, the scopes are very different and I don't provide any UI except for a little React component.  `}
highlight='helping of jest unit tests'
content= 
{<> Components can import modules they need and export themselves at the bottom of their files. 
    A simple component looks like this: 
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`test.only.each(new Array(1000).fill(null))('makeRandomHand x100 and riichi check', () => {
    const tiles = E.makeRandomHand();
    const result = tiles.every((tile) => E.validTile(tile));
    tiles.sort((tileA, tileB) => E.tileOrder(tileA, tileB))
    
    const riichi = E.riichi(tiles);
    expect(riichi, 'riichi failed with tiles: ' + tiles).toBe(true);
})`}/> </div>
    </div>
    </>}>
</Expand> ,
]

// export const UnityHtml = () => <div>Test</div>;

export const UnityHtml = (props) => {
    return (
    <>
    {props.data.map((item) =>  
            // <div key={item.key}>Test</div>
        <div className="expand--collapsed">
        <Expand 
        key={item.key} 
        name={item.text}
        highlight={item.highlight}
        content={<div className="expand--codeblock"><CodeBlock language={item.language} text={item.code} /></div>}
        />
        </div>
      )}
    </>
    );
}



export const dataExpressFormat = [unityFormat, csFormat, jsFormat];
// export const dataExpress = [unity, csharp, javascript]