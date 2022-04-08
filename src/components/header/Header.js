import React from "react"
import "./Header.css"
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router-dom";
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Breadcrumbs = (darkMode) => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <React.Fragment>
      {breadcrumbs.map(({ breadcrumb }) => {
        // console.log(breadcrumb)
        return <Link to={breadcrumb.key} className={`nav--item nav--item-shrink ${darkMode && `nav--item-dark`}`} onClick={() => window.scrollTo(0, 0)}> {breadcrumb} </Link>;
        })}
    </React.Fragment>
  );
}

function homeButton(darkMode, shrinkHeader) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <div className={`nav--home ${darkMode && `nav--home-dark`}`} >
            <p className={`header--icon material-icons-round ${darkMode && `header--icon-dark`}`} >{"electric_bolt"}</p>
            <h1 className={`header--title ${darkMode && `header--title-dark`} ${shrinkHeader && `header--title-shrink`}`} >richard nguyen</h1>
        </div>
    )
}

export default function Header(props) {
    const [shrinkHeader, setShrinkHeader] = React.useState(false);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setShrinkHeader(position > 200);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`header ${props.darkMode && `header--dark`} ${shrinkHeader && `header--shrink`}`}>
            <Link to={'projects'} style={{ textDecoration: "none" }} >{homeButton(props.darkMode, shrinkHeader)}</Link>
            <h2 className={
                `header--subtitle 
                ${props.darkMode && `header--subtitle-dark`}`}>
                {!shrinkHeader && `putting the magic smoke into code, wood, and steel.`}
                {shrinkHeader && Breadcrumbs(props.darkMode)
            }
            </h2>

            <nav className={props.darkMode ? "nav--dark" : ""}>

                <div className="nav--row">
                    {!shrinkHeader && <Link to={'projects'} className={`nav--item ${props.darkMode && `nav--item-dark`} ${shrinkHeader && `nav--item-shrink`}`}>projects</Link>}
                    <Link to={'about'} className={`nav--item ${props.darkMode && `nav--item-dark`} ${shrinkHeader && `nav--item-shrink`}`}>about</Link>
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