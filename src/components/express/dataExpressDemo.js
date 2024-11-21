import React from 'react'
import {Expand} from '../entry/Expand'
import {CodeBlock, dracula} from 'react-code-blocks'
import { nanoid } from 'nanoid'
import {TextBlock} from '../entry/LongEntry'

const unity = [<Expand name={` Because of gameplay reasons (portentious), the solver focuses on hands with 13 tiles, even though 14 tiles are needed to finish your hand. This is because depending on if you're waiting on a single tile or multiple, the scoring changes. So treating the hand as 13 by default makes the score computation easier. Following the files that deal with game logic you're led to LogicalHand.cs:checkThirteenTenpai.`} 
    highlight='LogicalHand.cs:checkThirteenTenpai'
    content= 
    {<> 
        <div className='expand--codeblock'>
        <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`public List<MahjongTileData> checkThirteenTenpai(List<MahjongTileData> list)
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
    }`}/> </div>
        </div>
        </>}>
    </Expand>, 

    <Expand name={`Admittedly, it's not great. But for code I dismissed as shoddy legacy code, it's organized and somewhat readable. Doesn't state what is returned. By inference it returns the last set of tiles that are waiting to be finished. It has some funny names like findAndRemoveMaxTriplesAndStraights, let's take a look.. `} 
    highlight='findAndRemoveMaxTriplesAndStraights'
    content= 
    {<>
        <div className='expand--codeblock'>
        <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`int findAndRemoveMaxTriplesAndStraights(ref List<MahjongTileData> full_tiles, List<MahjongTileData> suit_tiles, int max_melds)
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
    return maximum_melds_found;

}`}/> </div>
        </div>
        </>}>
    </Expand> ,

<Expand name={`It takes the approach of trying to remove as many straights or triples as it can from the list of tiles, which is somewhat prone to access faults as a list of the original tiles and the packaged 'melds' has to be maintained. Again, not necessarily bad but could be confusing. But most of the work seems like it's done by findTriplesAndStraights..`}
highlight='findTriplesAndStraights'
content= 
{<>
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`int findTriplesAndStraights(List<MahjongTileData> suit_tiles_temp, int desired_triples, int desired_straights, ref bool pair_remains)
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
}`}/> </div>
    </div>
    </>}>
</Expand> 
]

const csharp = [
<Expand name={`Okay, 2016 was a 10000 line bust but it had many other priorities like game interface, assets, ad and payment integration, and so on. Let's take a look at "simpleMahjong" meant to keep things simple and maintainable.`}
highlight='simpleMahjong'
content= 
{<>
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function MyComponent () {
return (
    <div className="App"> 
        <h1> My first React App </h1>
    </div>
)}`}/> </div>
    </div>
    </>}>
</Expand> ,
<Expand name={`example text`}
highlight='Components'
content= 
{<> Components can import modules they need and export themselves at the bottom of their files. 
    A simple component looks like this: 
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function MyComponent () {
return (
    <div className="App"> 
        <h1> My first React App </h1>
    </div>
)}`}/> </div>
    </div>
    </>}>
</Expand> ,
<Expand name={`example text`}
highlight='Components'
content= 
{<> Components can import modules they need and export themselves at the bottom of their files. 
    A simple component looks like this: 
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function MyComponent () {
return (
    <div className="App"> 
        <h1> My first React App </h1>
    </div>
)}`}/> </div>
    </div>
    </>}>
</Expand> ,
<Expand name={`example text`}
highlight='Components'
content= 
{<> Components can import modules they need and export themselves at the bottom of their files. 
    A simple component looks like this: 
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function MyComponent () {
return (
    <div className="App"> 
        <h1> My first React App </h1>
    </div>
)}`}/> </div>
    </div>
    </>}>
</Expand> ,
]

const javascript = [
<Expand name={`Finally we've arrived at the interface at the top of the page. `}
highlight='Components'
content= 
{<> Components can import modules they need and export themselves at the bottom of their files. 
    A simple component looks like this: 
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
<Expand name={`example text`}
highlight='Components'
content= 
{<> Components can import modules they need and export themselves at the bottom of their files. 
    A simple component looks like this: 
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function MyComponent () {
return (
    <div className="App"> 
        <h1> My first React App </h1>
    </div>
)}`}/> </div>
    </div>
    </>}>
</Expand> ,
<Expand name={`example text`}
highlight='Components'
content= 
{<> Components can import modules they need and export themselves at the bottom of their files. 
    A simple component looks like this: 
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function MyComponent () {
return (
    <div className="App"> 
        <h1> My first React App </h1>
    </div>
)}`}/> </div>
    </div>
    </>}>
</Expand> ,
<Expand name={`example text`}
highlight='Components'
content= 
{<> Components can import modules they need and export themselves at the bottom of their files. 
    A simple component looks like this: 
    <div className='expand--codeblock'>
    <div className="expand--codeblock"><CodeBlock language='jsx' className='expand--codeblock' text=
{`function MyComponent () {
return (
    <div className="App"> 
        <h1> My first React App </h1>
    </div>
)}`}/> </div>
    </div>
    </>}>
</Expand> ,
]

export const dataExpress = [unity, csharp, javascript]