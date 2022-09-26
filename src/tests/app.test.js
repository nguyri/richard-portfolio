// import AboutCard  from "../components/about-card/AboutCard";
// import renderer from 'react-test-renderer';

const mockDarkMode = jest.fn(true);

// it('render the about card correctly', () => {
//     const tree = renderer
//         .create(<AboutCard/>)
//         .toJSON();
//     expect(tree).toMatchSnapShot();
// })

test('adds 1 + 2 to equal 3', () => {
    expect (1 + 2).toBe(3);
});