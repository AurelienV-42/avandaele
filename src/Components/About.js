import React from 'react';

function About (props) {
    const {data} = props;

    let name = '';
    let profilepic = '';
    let bio = '';
    let street = '';
    let city = '';
    let state = '';
    let zip = '';
    let email = '';
    let resumeDownload = '';
    let language = 'en';

    if (data) {
        name = data.name;
        profilepic = "images/" + data.image;
        bio = data.bio;
        const {address} = data;
        street = address.street;
        city = address.city;
        state = address.state;
        zip = address.zip;
        email = data.email;
        resumeDownload = data.resumedownload;
        language = props.language;
    }

    return (
        <section id="about">
            <div className="row">
                <div className="three columns">
                    <img className="profile-pic"  src={profilepic} alt="Tim Baker Profile Pic" />
                </div>
                <div className="nine columns main-col">
                    {language === 'en' && <h2>About Me</h2>}
                    {language === 'fr' && <h2>À propos de moi</h2>}

                    <p>{bio}</p>
                    <div className="row">
                        <div className="columns contact-details">
                            {language === 'en' && <h2>Contact Details</h2>}
                            {language === 'fr' && <h2>Contacts</h2>}
                            <p className="address">
                                <span>{name}</span><br />
                                <span>{street}<br />
                                    {city} {state}, {zip}
                                </span><br />
                                <span>{email}</span>
                            </p>
                        </div>
                        <div className="columns download">
                            <p>
                                {language === 'en' && <a href={resumeDownload} className="button"><i className="fa fa-download"></i>Download Resume</a>}
                                {language === 'fr' && <a href={resumeDownload} className="button"><i className="fa fa-download"></i>Télécharger mon CV</a>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default About;
