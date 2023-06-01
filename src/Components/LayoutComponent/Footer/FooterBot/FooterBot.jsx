import './FooterBot.css';
//
import { social_Icons, payment_Icons } from '../../../../Data/footer_Icons';
//
import { Link } from 'react-router-dom';

const FooterBot = () => {
    return (
        <div className='FooterBot container'>
            <div className='SocialIcons FooterIcons'>
                {social_Icons.map((icon) => (
                    <a
                        href={icon.path}
                        key={icon.url}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <img
                            src={icon.url}
                            alt='Social_Icons'
                        />
                    </a>
                ))}
            </div>
            <div className='CopyRight'>
                &#169; 2021, <span>GOOD4ME</span>. Powered by Shopify
            </div>
            <div className='PaymentIcons FooterIcons'>
                {payment_Icons.map((icon) => (
                    <Link
                        to={icon.path}
                        key={icon.url}
                    >
                        <img
                            src={icon.url}
                            alt='Payment_Icons'
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FooterBot;
