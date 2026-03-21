import React,{useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [showPassword,setShowPassword] = useState(false);

const navigate = useNavigate();

const handleSubmit = async(e)=>{

e.preventDefault();

try{

const res = await API.post("/auth/login",{email,password});

localStorage.setItem("token",res.data.token);
localStorage.setItem("role",res.data.role);

if(res.data.role === "admin"){
navigate("/admin");
}
else{
navigate("/dashboard");
}

}
catch(err){
alert("Login Failed");
}

};
return(

<div className="form-container">

<h2>Login</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<div className="password-field">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<span
className="eye-icon"
onClick={()=>setShowPassword(!showPassword)}
>
{showPassword ? "Hide" : "Show"}
</span>

</div>

<button type="submit">Login</button>

</form>

</div>

);

}

export default Login;