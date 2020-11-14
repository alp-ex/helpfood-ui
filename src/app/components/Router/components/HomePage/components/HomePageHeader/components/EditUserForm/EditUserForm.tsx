import React, { ReactElement } from 'react'

interface Props {
    onClose: () => void
}

export default function EditUserForm({ onClose }: Props): ReactElement {
    return (
        <span onClick={onClose}>form</span>
        // <ModalContainer onClose={onClose}>
        //     <MultiplesTextInputsForm />
        //     // list of actions : logout/delete account/issues/help/etc
        // </ModalContainer>
    )
}
