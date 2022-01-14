import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AlertMenu from '../components/alertMenu';
function logout() {
    const { data: session, status } = useSession();
    const [revealAlert, setRevealAlert] = useState(false);
    const [alertStyle, setAlertStyle] = useState({});
    const router = useRouter();
    useEffect(() => {
      if (!session) return router.push('/');
      setAlertStyle({
        variantHead: 'danger',
        heading: 'Внимание!',
        text: `Вы действительно хотитте выйти?`,
        color1: 'danger',
        button1: 'Подтвердить',
        color2: 'secondary',
        button2: 'Отменить',
      });
      setRevealAlert(true);
    }, []);
    const onReturn = async(choice) => {
        setRevealAlert(false);
        if (choice==="Подтвердить") signOut();
        return router.push('/');
        
      }
    return (
        <div>
     {revealAlert && <AlertMenu onReturn={onReturn} styling={alertStyle} />}           
        </div>
    )
}

export default logout
