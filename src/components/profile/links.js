import React from "react";
import './style.css';
import { API_URL } from '../../config';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useParams} from "react-router-dom";


function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16);
    var g = parseInt(color.substring(2, 4), 16);
    var b = parseInt(color.substring(4, 6), 16);
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? darkColor : lightColor;
}

function addAlpha(color, opacity) {
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

const socialIcons = {
    facebook: 'fa-brands fa-facebook',
    twitter: 'fa-brands fa-twitter',
    linkedin: 'fa-brands fa-linkedin-in',
    youtube: 'fa-brands fa-youtube',
    instagram: 'fa-brands fa-instagram',
    pinterest: 'fa-brands fa-pinterest',
    github: 'fa-brands fa-github',
    gitlab: 'fa-brands fa-gitlab',
    medium: 'fa-brands fa-medium',
    dribble: 'fa-brands fa-dribbble',
    behance: 'fa-brands fa-behance',
    website: 'fa-solid fa-earth-americas'
}

let getIcon = (link) => {
    let one = 0, two = 0;

    for(let i=0;i<link.length;i++){
        if(link[i]=='.')
        {
            if(one==0)
                one=i+1;
            else if(two==0)
                two = i;
            else
                break;
        }
    }

    let name = link.substring(one,two);

    if(Object.keys(socialIcons).indexOf(name)==-1)
        name = 'website';
    return {
        name,
        icon:socialIcons[name]
    };
}

function Model(){

    const [user, setUser] = React.useState(null);

    const {name} = useParams();

    React.useEffect(()=>{
        let doWork = async () => {
            const res = await axios.get(`${API_URL}/profile/${name}`,);
            const data = res.data.data;
            setUser(data);
        }

        doWork();
    },[])

    React.useEffect(()=>{
        if(user){
            let r = document.querySelector(':root');
            r.style.setProperty('--primary-fore', pickTextColorBasedOnBgColorSimple(user.brandColor.primary,'#FFFFFF', '#000000'));
            r.style.setProperty('--secondary-fore', pickTextColorBasedOnBgColorSimple(user.brandColor.secondary,'#FFFFFF', '#000000'));
            r.style.setProperty('--primary-back', user.brandColor.primary);
            r.style.setProperty('--secondary-back', user.brandColor.secondary);
            r.style.setProperty('--primary-opaque',addAlpha(user.brandColor.primary,0.3))
        }
    },[user])

    let redirectToWebpage = (link) => {
        link='https://'+link;
        window.open(link, '_blank');
    }

	return (
		<div className='profile-links'>
	        {user?
                <>
	                <div className='user-profile-nav'>
	                    <div className="user-profile-nav-image-cont">
	                        <img src={`${API_URL}/profile/getImage/${user.profile.name}`} className='user-profile-nav-image' />
	                    </div>
	                    <div className="user-profile-nav-text-cont">
	                        {user.brand}
	                    </div>
	                </div>
	                <div className='user-profile-links'>
	                	<div className="user-container">
	                		<div className='user-profile-images'>
	                            <div className="user-profile-image-link-cont">
			                        <img src={`${API_URL}/profile/getImage/${user.profile.name}`} className='user-profile-image-link-cont-img' />
	                            </div>
	                            <div className="user-profile-body-part--1-profile-brand">
	                                {user.brand}
	                            </div>
	                		</div>
		                	<div className='user-profile-img-link'>
		                		Links
		                	</div>
		                	<div className="user-profile-link-cont">
		                		{
			                		user.socialData.map((item,index)=>{
	                                    const {name,icon} = getIcon(item);
	                                    return (
				                			<div className='user-profile-link-cont-box' key={index} onClick={e=>redirectToWebpage(item)}>
			                					<i className={`user-profile-link-cont-box-icon ${icon} `} />
			                					<div className='user-profile-link-cont-box-text'>
			                						{name}
			                					</div>
				                			</div>
	                                    )	
			                		})	
		                		}

	                			<div className='user-profile-link-cont-box'>
                					<img className='user-profile-link-cont-box-icon sp-img' src={`${API_URL}/profile/getImage/${user.profile.name}`} />
                					<div className='user-profile-link-cont-box-text'>
                						Store
                					</div>
	                			</div>
		                	</div>
	                	</div>		
	                </div>
	                <div className='user-links-profile-footer'>
	                    <div className="user-profile-footer-sub">
	                        <div className="user-profile-footer-subnes">
	                            Powered by Qube
	                        </div>
	                    </div>
	                </div>
                </>
                :null}
		</div>
	)
}

export default Model;