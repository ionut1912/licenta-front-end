import React from 'react'

export default function HideBackgroundForNav(props) {

    const closeModalNav = () => {
        props.setShowModalNav(false);
        props.setClickForNavBar(false);
        props.setClickForSideBar(false);
    }

    return (
        <div className="back-drop" style={{
            transform: props.showModalNav ? 'translateY(0vh)' : 'translateY(-100vh)',
        }} onClick={closeModalNav} />
    )
}

