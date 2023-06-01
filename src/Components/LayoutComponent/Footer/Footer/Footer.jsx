import './Footer.css';
//
import FooterTop from '../FooterTop/FooterTop';
import FooterBot from '../FooterBot/FooterBot';

const Footer = () => {
    return (
        <footer>
            <div className='FooterTopBG'></div>
            <FooterTop />
            <hr />
            <FooterBot />
        </footer>
    );
};

export default Footer;
