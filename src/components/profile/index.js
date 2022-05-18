import React from "react";
import './style.css';
import { API_URL } from '../../config';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';


function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, bgColor.length) : bgColor;
    var r = parseInt(color.substring(0, 2), 16);
    var g = parseInt(color.substring(2, 4), 16);
    var b = parseInt(color.substring(4, 6), 16);
    var a = parseInt(color.substring(6, 8), 16) / 255;

    let ans = ((r * 0.299) + (g * 0.587) + (b * 0.114));


    if(isNaN(a))
        return (ans > 186) ? darkColor : lightColor;
    else
        return ans > 125 || a < 0.5 ? darkColor : lightColor;
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
        if(link[i]==='.')
        {
            if(one===0)
                one=i+1;
            else if(two===0)
                two = i;
            else
                break;
        }
    }

    let name = link.substring(one,two);

    if(Object.keys(socialIcons).indexOf(name)===-1)
        name = 'website';
    return {
        name,
        icon:socialIcons[name]
    };
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
  

function Profile(){

    const [user, setUser] = React.useState(null);

    const {name} = useParams();

    React.useEffect(()=>{
        let doWork = async () => {
            const res = await axios.get(`${API_URL}/profile/${name}`);
            const data = res.data.data;
            setUser(data);
        }

        doWork();
    },[])

    React.useEffect(()=>{
        if(user){
            try{
                let r = document.querySelector(':root');
                let val = isOverflown(document.querySelector('.user-profile-body-part--1-profile-links-cont'));

                if(user.intro.length<=50){
                    document.querySelector('.user-profile-body-part--1-profile-intro').style.fontSize = '2rem';
                    document.querySelector('.user-profile-body-part--1-profile-intro').style.fontWeight = 'bold';
                } else {
                    document.querySelector('.user-profile-body-part--1-profile-intro').style.fontSize = '1rem';
                }

                if(!val){
                    document.querySelector('.user-profile-body-part--1-profile-links-head-slave').style.display = 'none';
                    document.querySelector('.user-profile-body-part--1-profile-links-cont').style.overflow = 'hidden';
                }
                r.style.setProperty('--primary-fore', pickTextColorBasedOnBgColorSimple(user.brandColor.primary,'#FFFFFF', '#000000'));
                r.style.setProperty('--secondary-fore', pickTextColorBasedOnBgColorSimple(user.brandColor.secondary,'#FFFFFF', '#000000'));
                r.style.setProperty('--primary-back', user.brandColor.primary);
                r.style.setProperty('--secondary-back', user.brandColor.secondary);

                let colo = pickTextColorBasedOnBgColorSimple(user.brandColor.secondary,'#ffffff', user.brandColor.primary);
                let opq = addAlpha(colo,0.3);

                r.style.setProperty('--primary-opaque-back',opq)
                r.style.setProperty('--primary-opaque-fore',colo==="#ffffff"?colo:"#000000")
            } catch(err){
                console.log(err.message)
            }
        }
    },[user])

    let redirectToWebpage = (link) => {
        link='https://'+link;
        window.open(link, '_blank');
    }

    console.log(user);

    return (
        <div className="user-profile">
            {user?
                <>
                <div className='user-profile-nav'>
                    <div className="user-profile-nav-image-cont">
                        <Link to={`/${name}`}>
                            <img src={`${API_URL}/profile/getImage/${user.profile.name}`} className='user-profile-nav-image' alt="User"/>
                        </Link>
                    </div>
                    <div className="user-profile-nav-text-cont">
                        {user.brand}
                    </div>
                </div>
                <div className='user-profile-body'>
                    <div className="user-profile-body-part--1">
                        <div className="user-profile-body-part--1-profile">
                            <div className="user-profile-body-part--1-profile-image-cont">
                                <img src={`${API_URL}/profile/getImage/${user.profile.name}`} className='user-profile-body-part--1-profile-image' alt='User'/>
                            </div>
                            <div className="user-profile-body-part--1-profile-brand">
                                {user.brand}
                            </div>
                            <div className="user-profile-body-part--1-profile-intro">
                                {user.intro}
                            </div>
                            <div className="user-profile-body-part--1-profile-links">
                                <div className="user-profile-body-part--1-profile-links-head-master">
                                    <p className="user-profile-body-part--1-profile-links-head">Links</p>
                                    <div className="user-profile-body-part--1-profile-links-head-slave">
                                        <Link to={`/${name}/links`}>
                                            See all
                                        </Link>
                                    </div>
                                </div>
                                <div className="user-profile-body-part--1-profile-links--master">
                                    <div className="user-profile-body-part--1-profile-links-cont">
                                        {
                                            user.socialData.map((item,index)=>{
                                                const {name,icon} = getIcon(item);
                                                return (
                                                    <div className="user-part--1-profile-icons-parent" key={index} title={item}>
                                                        <div className="user-part--1-profile-icons" onClick={(e)=>redirectToWebpage(item)}>
                                                            <i className={icon}></i>
                                                            <p>{name}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="user-profile-body-part--1-profile-cta-cont">
                                <button className="user-profile-body-part--1-profile-cta">
                                    <i className="fa-light fa-cart-shopping"></i>
                                    Shop Now
                                </button>
                            </div>
                        </div>
                        <div className="user-profile-body-part--1-cover">
                            <div className="user-profile-body-part--1-cover-image-cont">
                                <img src={`${API_URL}/profile/getImage/${user.cover.name}`} className='user-profile-body-part--1-cover-image' alt='User Cpver'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='user-profile-footer'>
                    <div className="user-profile-footer-name">{user.brand}</div>
                    <div className="user-profile-footer-links-cont">
                        {
                            user.socialData.map((item,index)=>{
                                const {icon} = getIcon(item);
                                return (
                                    <div key={index} className="user-profile-footer-links" onClick={(e)=>redirectToWebpage(item)} title={item}>
                                        <i className={icon}></i>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="user-profile-footer-sub">
                        <div className="user-profile-footer-subnes">
                            powered by Qube
                        </div>
                    </div>
                </div>
            </>:null}
        </div>
    )
}

export default Profile;