import React from "react"
import "./Header.css"
import { useMediaQuery } from 'react-responsive'
import { Link, useOutletContext } from "react-router-dom";
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export default function Header(props) {
    const entriesLayout = document.querySelector(".entries-layout");
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1450px)' });
    const shrinkHeader = props.shrinkHeader;

    // const handleScroll = () => {
    //     const position = entriesLayout.scrollTop;
    //     console.log(position);
    //     setShrinkHeader(position > 10);
    // };

    const Breadcrumbs = (darkMode) => {
        const breadcrumbs = useBreadcrumbs();
        return ( <>
                {breadcrumbs.map(({ breadcrumb }) => {
                    return <React.Fragment key={breadcrumb.key}> {!shrinkHeader ? '' : '/'} 
                    <Link
                        to={breadcrumb.key}
                        className={`nav--item nav--item-shrink ${darkMode && `nav--item-dark`}`}
                        onClick={() => {entriesLayout.scrollTo(0,0)}}
                        >
                        {!shrinkHeader ? '' : breadcrumb.props.children.toLowerCase()}
                    </Link>
                    </React.Fragment>
                })}  </>
        );
    }
    // React.useEffect(() => {}, [shrinkHeader]);
    // React.useEffect(() => {
    //     entriesLayout && entriesLayout.addEventListener("scroll", handleScroll);
    //     console.log("in useeffect", entriesLayout);
    //     return () => {
    //         entriesLayout && entriesLayout.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    function homeButton() {
        return (
            <div className={`nav--home ${props.darkMode && `nav--home-dark`}`} onClick={() => {window.scrollTo(0,0)}}>
                <p className={`header--icon header--firsticon material-icons-round ${props.darkMode && `header--icon-dark`}`} >{"electric_bolt"}</p>
                <h1 className={`header--title header--firstname ${props.darkMode && `header--title-dark`} ${shrinkHeader && `header--title-shrink`}`} >richard </h1>
                <h1 className={`header--title ${props.darkMode && `header--title-dark`} ${shrinkHeader && `header--title-shrink`}`} > nguyen</h1>
            </div>
        )
    }

    return (
        <div className={`header ${props.darkMode && `header--dark`} ${shrinkHeader && `header--shrink`}`}>
            { ((isTabletOrMobile && !shrinkHeader) || (!isTabletOrMobile)) && <Link to={'projects'} style={{ textDecoration: "none" }} >{homeButton()}</Link>}
            
            <h2 className={`header--subtitle ${props.darkMode && 'header--subtitle-dark'} ${shrinkHeader && 'header--subtitle-shrink'}`}>
                {!shrinkHeader && !isTabletOrMobile && (
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div className={'header--subtitle-text'}>
                        putting the magic smoke into 
                    </div>
                    <div className={'header--subtitle-text'}>
                        <div className="material-icons-round header--icon" style={{ width: '20px' }}> auto_fix_normal</div>
                        wood 
                        <div className="material-icons-round header--icon" style={{ width: '20px' }}> park</div>
                        code 
                        <div className="material-icons-round header--icon" style={{ width: '25px' }}>terminal</div>
                        steel 
                        <div className="material-icons-round header--icon" style={{ width: '20px' }}> precision_manufacturing</div>
                    </div></div>
                )}
                {/* h_mobiledata */} 
                {Breadcrumbs(props.darkMode)}
            </h2>

            <nav className={props.darkMode ? "nav--dark" : ""}>
                <div className="nav--row">
                    { ((!shrinkHeader && isTabletOrMobile) || (!isTabletOrMobile)) && 
                        <>
                            <Link to={'projects'} className={`nav--item ${props.darkMode && `nav--item-dark`} ${shrinkHeader && `nav--item-shrink`}`}>projects</Link>
                            <Link to={'gallery'} className={`nav--item ${props.darkMode && `nav--item-dark`} ${shrinkHeader && `nav--item-shrink`}`}>gallery</Link>
                            <Link to={'three-gallery'} className={`nav--item ${props.darkMode && `nav--item-dark`} ${shrinkHeader && `nav--item-shrink`}`}>models</Link>
                            <Link to={'about'} className={`nav--item ${props.darkMode && `nav--item-dark`} ${shrinkHeader && `nav--item-shrink`}`}>about</Link>
                        </>}
                    {/* <Link to={'docs'} className="nav--item">docs</Link> */}
                    <div className="toggler">
                        <p className="toggler--light">light</p>
                        <div className="toggler--slider" onClick={props.toggleDarkMode} >
                            <div className="toggler--slider--circle"></div>
                        </div>
                        <p className="toggler--dark">dark</p>
                    </div>
                </div>
            </nav>
        </div>
    )
}