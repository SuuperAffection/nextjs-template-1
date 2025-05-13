'use client'

import { InputText } from 'primereact/inputtext'
import 'primeicons/primeicons.css';
import styles from './form.module.css'
import { Button } from 'primereact/button';
import { useEffect, useReducer } from 'react';
import { defaultState, reducer } from './login/reducer';
import { Action } from './login/action';
import { useRouter } from 'next/navigation';
import { Progress } from '@/lib/components/progress/progress';

export default function Form() {
    const [state, dispatch] = useReducer(reducer, undefined, defaultState)
    const router = useRouter()

    useEffect(() => {
        if (state.nextURL) {
            router.push('/sample')
        }
    }, [state.nextURL])

    return (
        <>
            <div className={styles.masterBox}>
                <div className={styles.loginBody}>
                    <div>
                        <div className={styles.userIdWrap}>
                            <InputText
                                placeholder='ユーザーID'
                                className={styles.input}
                                value={state.userId}
                                onChange={(e) => {
                                    Action.editForm(dispatch, 'userId', e.target.value)
                                }}
                            />
                        </div>
                        <div className={styles.pwWrap}>
                            <InputText
                                placeholder='パスワード'
                                type='password'
                                className={styles.input}
                                value={state.pw}
                                onChange={(e) => {
                                    Action.editForm(dispatch, 'pw', e.target.value)
                                }}
                            />
                        </div>
                        <div className={styles.loginButtonWrap}>
                            <Button
                                label='ログイン'
                                disabled={state.userId === '' ? true : state.pw === '' ? true : false}
                                className={styles.loginButton}
                                onClick={() => {
                                    Action.login(dispatch, state.userId, state.pw)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {state.isWaiting &&
                <Progress />
            }
        </>
    )
}