import style from '../styles/Footer.modules.scss';
function Footer() {
    return ( <>
    <div className="footer_container">
        <div className="footer">
        <div className="left_nav">© 2024 Trọ việt, Inc.</div>
        <div className="right_nav">
            <div className="icon_container">
                <img className='icon' src="https://cdn3.iconfinder.com/data/icons/social-media-2527/24/glyph_facebook_facebook_logo_logo_logotype_letter_f_social_media_social_media-512.png" alt="" />
            </div>
            {/* 18px */}
            <div className="icon_container">
            <img className='icon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IrN6AZLj3c4RVfanU7DYA7tgRz7-AdTpaKoXSIOtVQ&s" alt="" />
            </div>
            <div className="icon">
                <img className='icon youtube' src="https://www.iconpacks.net/icons/1/free-youtube-icon-123-thumb.png" alt="" />
            </div>
        </div>
        </div>
    </div>
    </> );
}

export default Footer;