import React, {useState} from 'react'
import { Button, FormControl, FormLabel, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import { Input, InputGroup } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { domAnimation } from 'framer-motion';
const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const history=useHistory();
    const [{show1,show2}, setShow] = useState({show1:false,show2:false});
    const handleClick = (e) =>{
        if(e.target.id==='pass'){
            setShow({ show1: !show1, show2: show2 });
        }
        else if(e.target.id==='cnf'){
            setShow({ show1: show1, show2: !show2 });
        }
        
    }

    const postDetails=(pics)=>{
        setLoading(true);
        if(pics===undefined){
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: "true",
                position: "bottom",
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png"){
            const data=new FormData();
            data.append("file",pics);
            data.append("upload_preset","Chat App");
            data.append("cloud_name","chatapp3");
            fetch("https://api.cloudinary.com/v1_1/chatapp3/image/upload",{
                method: "post",
                body: data, 
            }).then((res)=>res.json())
            .then((data)=>{
                setPic(data.url.toString());
                setLoading(false);
            })
            .catch((err)=>{
                console.log.apply(err);
                setLoading(false);
            });
        }
        else{
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: "true",
                position: "bottom",
            });
            setLoading(false);
            return;   
        }
    }
    const submitHandler= async()=>{
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
            toast({
                title: "Please Fill all Fields",
                status: "warning",
                duration: 5000,
                isClosable: "true",
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if(password !== confirmpassword){
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: "true",
                position: "bottom",
            });
            return;
        }

        try {
            const config={
               headers:{
                "Content-type":"application/json",
               },
            };
 
            const { data } = await axios.post("api/user", { name, email, password, pic }, config);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: "true",
                position: "bottom",
            });
            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            history.push('/chats')
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: "true",
                position: "bottom",
            });
        }
    };


  return (
    <VStack spacing='5px'>
<FormControl id='first-name' isRequired> 
    <FormLabel>Name</FormLabel>
    <Input
        placeholder='Enter Your Name'
        onChange={(name)=>setName(name.target.value)}
    />
</FormControl>

<FormControl id='email' isRequired>
    <FormLabel>Email</FormLabel>
    <Input
        placeholder='Enter Your Email'
        onChange={(e)=>setEmail(e.target.value)}
    />
</FormControl>

<FormControl id='password' isRequired>
    <FormLabel>Password</FormLabel>
    <InputGroup>
    <Input
        type={show1 ? "text" : 'password'}
        placeholder='Enter Password'
        onChange={(e)=>setPassword(e.target.value)}
    />
    <InputRightElement width='4.5rem'>
        <Button id='pass' h='1.75rem' size="sm" onClick={handleClick}>
            {show1? "Hide" : "Show"}
        </Button>
    </InputRightElement>
    </InputGroup>
</FormControl>

<FormControl id='confirmPassword' isRequired>
    <FormLabel>Confirm Password</FormLabel>
    <InputGroup>
    <Input
        type={show2 ? "text" : 'password'}
        placeholder='Confirm Password'
        onChange={(e)=>setConfirmpassword(e.target.value)}
    />
    <InputRightElement width='4.5rem'>
        <Button id='cnf' h='1.75rem' size="sm" onClick={handleClick}>
            {show2? "Hide" : "Show"}
        </Button>
    </InputRightElement>
    </InputGroup>
</FormControl>
    <FormControl id="pic">
        <Input
            type='file'
            p={1.5}
            accept='image/*'
            onChange={(e)=>postDetails(e.target.files[0])}
        />
    </FormControl>
<Button
    colorScheme='blue'
    width="100%"
    style={{marginTop:15}}
    onClick={submitHandler}
    isLoading={loading}
    > 
        Sign Up
    </Button>  

    </VStack>
  )
}

export default Signup