import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(SpecificComponent, option, adminRoute = null) {

    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입   가능한 페이지
    // false > 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                if(!response.payload.isAuth) {
                    // 로그인하지 않은 상태
                    if(option){
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        // 어드민만 가능한 페이지
                        props.history.push('/')
                    } else {
                        // 출입 불가능한 페이지
                        if(option === false)
                            props.history.push('/')
                    }
                }

            })

        }, [])

        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}