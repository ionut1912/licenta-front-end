import React, { useEffect } from 'react'
import { Grid, makeStyles, FormControl, Select, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';
import Button from './Button'
import { useForm, Form } from '../AdminDashboard/useForm';

const initialFValues = {
    role: '',

}

const useStyle = makeStyles(theme => ({
    pageContent: {
        justifyContent: 'center'
    }
}))

export default function FormGradUser(props) {

    const classes = useStyle();

    const { recordForEdit, editGrad } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('role' in fieldValues)
            temp.role = fieldValues.role.length !== 0 ? "" : "This field is required"

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "");
    }

    const { values, setValues, errors, setErrors, resetForm, handleInputChange } = useForm(initialFValues, true, validate);


    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            editGrad(values, resetForm);
        }
    }

    useEffect(() => {

        if (recordForEdit !== null) {
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
            <Grid container className={classes.pageContent}>
                <FormControl
                    variant="outlined"
                    {...(errors.role && { error: true })}
                >
                    <InputLabel>Grad</InputLabel>
                    <Select
                        name="role"
                        label="Grad"
                        value={values.role}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                        <MenuItem value="ROLE_USER">User</MenuItem>
                    </Select>
                    {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
                <div>
                    <Button
                        type="submit"
                        size="large"
                        text="Submit" />
                    <Button
                        type="reset"
                        size="large"
                        color="default"
                        text="Reset"
                        onClick={resetForm} />
                </div>
            </Grid>
        </Form>
    )
}

