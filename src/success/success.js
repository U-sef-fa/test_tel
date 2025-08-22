import './success.css';

export default function Success(){
return (
    <div>
        <div id="header">
            <div id="tel_home">
                <a href="https://telegram.org">
                <img src="/images/telegram-svg.svg"/>
                <p>
                Home

                </p>
                </a>
            </div>
            <div id="rel_links">
                <ul>
                    <li>
                        <a href="https://telegram.org/privacy">
                            privacy policy
                        </a>
                    </li>                   
                    <li>
                        <a href="https://telegram.org/support">
                            contact us
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div id='bdy'>
            <div id="img_desc">
                <img src="/images/checkmark.png"/>
            </div>
            <div id="text_desc">
                <p>
                The verification is now completed and your account is safe. Thank you for your attention to this matter.
                </p>
            </div>
        </div>
    </div>
)
}