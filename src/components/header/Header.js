import React from "react"
import "./Header.css"
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router-dom";
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export default function Header(props) {
    const [shrinkHeader, setShrinkHeader] = React.useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const handleScroll = () => {
        const position = window.pageYOffset;
        setShrinkHeader(position > 100);
    };

    const Breadcrumbs = (darkMode) => {
        const breadcrumbs = useBreadcrumbs();
        return ( <>
                {breadcrumbs.map(({ breadcrumb }) => {
                    return <React.Fragment key={breadcrumb.key}> {!shrinkHeader ? '' : '/'} <Link
                        to={breadcrumb.key}
                        className={`nav--item nav--item-shrink ${darkMode && `nav--item-dark`}`}
                        onClick={() => window.scrollTo(0, 0)} >
                        {/* {breadcrumb} */}
                        {!shrinkHeader ? '' : breadcrumb.props.children.toLowerCase()}
                    </Link>
                    </React.Fragment>
                })}  </>
        );
    }

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function homeButton() {
        return (
            <div className={`nav--home ${props.darkMode && `nav--home-dark`}` } onClick={() => window.scrollTo(0, 0)}>
                <p className={`header--icon material-icons-round ${props.darkMode && `header--icon-dark`}`} >{"electric_bolt"}</p>
                <h1 className={`header--title ${props.darkMode && `header--title-dark`} ${shrinkHeader && `header--title-shrink`}`} >richard nguyen</h1>
            </div>
        )
    }

    return (
        <div className={`header ${props.darkMode && `header--dark`} ${shrinkHeader && `header--shrink`}`}>
            { ((isTabletOrMobile && !shrinkHeader) || (!isTabletOrMobile)) && <Link to={'projects'} style={{ textDecoration: "none" }} >{homeButton()}</Link>}
            
             <h2 className={
                    `header--subtitle  ${props.darkMode && `header--subtitle-dark`}  ${shrinkHeader && `header--subtitle-shrink`}`}>
                    { ((!shrinkHeader && !isTabletOrMobile)) &&
                     <div style={{display: "flex", flexDirection: "row", alignItems:"center",}}>
                        putting the magic smoke 
                        into {<div className="material-icons-round" style={{marginInline:"15px", width:'20px'}}> auto_fix_normal</div>} 
                        wood {<div className="material-icons-round" style={{marginInline:"15px", width:'20px'}}> park</div>} 
                        code {<div className="material-icons-round" style={{marginInline:"15px", width:'25px'}}>terminal</div>} 
                        steel {<div className="material-icons-round" style={{marginInline:"15px", width:'20px'}}> precision_manufacturing</div>} </div> }
                        {/* h_mobiledata */} 
                    { Breadcrumbs(props.darkMode) }
                </h2>   

            <nav className={props.darkMode ? "nav--dark" : ""}>
                <div className="nav--row">
                    { (!shrinkHeader && isTabletOrMobile) && <Link to={'projects'} className={`nav--item ${props.darkMode && `nav--item-dark`} ${shrinkHeader && `nav--item-shrink`}`}>projects</Link>}
                    { (!shrinkHeader && isTabletOrMobile) && <Link to={'about'} className={`nav--item ${props.darkMode && `nav--item-dark`} ${shrinkHeader && `nav--item-shrink`}`}>about</Link>}
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