import React from 'react';
import { useForm } from 'react-hook-form';
import logo from '../../image/logo.png';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    let navigate = useNavigate();
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('Enter Key Pressed');
          login();
        }
      }
    let uname = React.createRef();
    let pwd = React.createRef();

    function login() {
        const formData = {displayName:uname.current.value,password:pwd.current.value};
        //console.log(formData);
        $.ajax({			
			type: 'POST',
			data: formData,
			success: function (data) {				
				var responseObj = JSON.parse(data);
                console.log(responseObj);
				if (responseObj[0] == 'LOGIN_SUCCESS') {
                    localStorage.setItem("dToken", JSON.stringify(formData));
					localStorage.setItem('admin',responseObj[1]);
                    navigate('/Dashboard');
				}else{
                    alert(data);
                }
			},
			error: function (html) {
				//alert(html);
				console.log(html);				
			},
			url: window.BACK_END_URL+'loginAdmin.php',
			cache: false
		});
        return false;
    }
    return (
        <section className='bg-bg-gray h-screen'>
            <div className='container flex flex-col w-full md:w-[70%] lg:w-[50%]    p-3  h-screen justify-center'>
                <div className='flex flex-col bg-bg-gray p-8 rounded-2xl border-[20px] border-white ' >
                    <div className="text-center space-y-6">
                        <img className='inline-block' src={logo} alt="" />
                        <h4 className='text-xl pb-8'>Control Panel Login</h4>
                    </div>
                    <div>
                        <label className="block text-gray-600 text-base font-semibold mb-3" htmlFor="username">
                            User Name
                        </label>
                        <input ref={uname} className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500   focus:z-10' id='username' placeholder="Username" />
                        {/* {errors?.displayName && <p className='mt-1 text-red-500 text-sm'>This field is required</p>} */}
                        {/* include validation with required or other standard HTML validation rules */}
                        <label className="block text-gray-600 text-base font-semibold mb-3 mt-5" htmlFor="password">
                            Password
                        </label>
                        <input ref={pwd} onKeyDown={handleKeyDown} placeholder="password" id='password' type='password' className='w-full px-6 py-3 rounded-lg focus:outline-none border placeholder-gray-500 focus:ring-indigo-500  inline-block  focus:z-10 mb-5' />

                        {/* <input type="checkbox" /> <label className='text-gray-600 text-base font-semibold mb-3' htmlFor="checkbox">Remember Me</label> */}
                        <button onClick={login} className='w-full cursor-pointer text-base text-[#20252C]  py-3 bg-[#EFDC58] mt-8 rounded-xl'>login</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;