import { ChangeEvent } from "react";

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

import { IPassport } from "@root/interfaces/user";
import { Button } from '@root/components/Button'
import { TextInput } from '@components/Inputs/TextInput'

const commonStyle = cs as ICommonStyle

export interface IUserPassportProps {
    onSave: () => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void

    changedPassportFiled: Partial<IPassport & { publicKey: string }>
    errors?: Partial<Record<FormFiledIds, string>>
}

export enum FormFiledIds {
    PlaceOfBirth = 'placeOfBirth',
    PublicKey = 'publicKey',
}

export function PassportForm(props: IUserPassportProps) {
    const { errors, changedPassportFiled, onSave, onChange } = props

    return (
        <div>
            <div className={commonStyle.Margin32} />
            <h1>Passport fields</h1>
            <div className={commonStyle.Margin24}/>
            <TextInput
                label='Place of birth'
                placeholder='i.e. "Moscow"'
                value={changedPassportFiled.placeOfBirth}
                id={FormFiledIds.PlaceOfBirth}
                onChange={onChange}
                errorText={errors?.[FormFiledIds.PlaceOfBirth]}
            />
            <div className={commonStyle.Margin24} />
            <TextInput
                type="textarea"
                label='Public key'
                placeholder='i.e. "--PUBLIC KEY START--"'
                value={changedPassportFiled.publicKey}
                id={FormFiledIds.PublicKey}
                onChange={onChange}
                errorText={errors?.[FormFiledIds.PublicKey]}
            />
            <div className={commonStyle.Margin32} />
            <Button disabled={!!Object.keys(errors as Object).length} style={{ float: 'right' }} title='Update info' onClick={onSave} />
            <div className={commonStyle.ClearFix} />
        </div>
    );
}
