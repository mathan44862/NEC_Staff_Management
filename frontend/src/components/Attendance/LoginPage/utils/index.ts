const validate = (values: any) =>{
    interface error {
        [key: string]: string;
    }
    const errors:error ={};
    if(!values.email){
        errors.email = "*Required "+values.email; 
    }
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)){
        errors.email = "*Invalid"
    }
    if(!values.password){
        errors.password = "*Required password"; 
    } 
    else if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)){
        errors.password = "*Must contian 1 special character,1 number";
    }
    return errors;
}


export default validate;