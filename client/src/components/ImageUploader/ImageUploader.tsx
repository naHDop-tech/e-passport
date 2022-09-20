import { ChangeEvent, useRef } from 'react'

import s from './ImageUploaderStyle.module.css'
const styles = s as unknown as IImageUploaderStyle

interface IImageUploaderStyle {
  ButtonWrapper: string
  HiddenInput: string
  InputLabel: string
}

export interface IImageUploaderProps {
  setImage: (e: File) => void
  component: () => JSX.Element
  file?: File
}

export function ImageUploader(props: IImageUploaderProps) {
  const { setImage, component: Component } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  };

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  return (
    <div className={styles.ButtonWrapper}>
      <div onClick={handleClick} className={styles.InputLabel}>
        <Component />
        <input
          className={styles.HiddenInput}
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={imageUploadHandler}
        />
      </div>
    </div>
  )
}
