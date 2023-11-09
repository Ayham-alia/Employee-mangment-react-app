import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import img from "../images/Ellipse 13.png";
import wifi from "../images/wifi.png";
import Joi from 'joi';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
function Edit_IPAddress() {
    let token = localStorage.getItem('token');
    let [IPdata, setIPdata] = useState();
    let [errorList, setErrorList] = useState([]);
    const onChange = (e) => {
        let { value } = e.target;
        setIPdata(value);
        console.log(IPdata);
    }
    //get current IP address
    const getIPAddress = async () => {
        let { data } = await axios.get("https://staff-scanner.vercel.app/company/ip", { headers: { "Authorization": `Bearer ${token}` } });
        setIPdata(data.Public_IP_Address);
        console.log(IPdata);
     }
        
    const onSubmit = async (e) => {
        e.preventDefault();
        IPdata={ IPAddress: IPdata.toString() };
        console.log(IPdata);
        let err = validation(IPdata);
        if (err.error) {
            setErrorList(err.error.details);
        }
        else {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Edit it!',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    // Wrap the code inside an async function
                    let { data } = await axios.patch("https://staff-scanner.vercel.app/company/editIP", IPdata, { headers: { "Authorization": `Bearer ${token}` } });
                    console.log(data);
                    Swal.fire(
                      'Edited!',
                      'IP Address edit successfully.',
                      'success'
                    );
                  } catch (error) {
                    Swal.fire(
                      'Error',
                      'An error occurred during the update.',
                      'error'
                    );
                  }
                }
              });
              
                setErrorList('');
                setIPdata("");
        }
    }

    function validation(ipData) {
        const schema = Joi.object({
            IPAddress: Joi.string().ip({ version: ['ipv4'] }).required()
        });
        return schema.validate(ipData, { abortEarly: false });
    }
    return (
        <>

            <div className='d-flex overflow-x-hidden'>
                <Sidebar />
                <div className="DashSide ">
                    <div className="WelcomeSection">
                        <div className="Content d-flex">
                            <img src={img} />
                            <div className="Head">
                                <h2>Welcome Mohammed !</h2>
                                <p>Start your work now</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width={35} height={34} viewBox="0 0 35 34" fill="none">
                                <path d="M3.07574 17.728L11.5217 22.0418C11.7715 22.1667 12.3164 22.4732 12.6229 21.9737C12.9067 21.5083 12.4299 21.1336 12.2028 20.9634L2.3719 13.4369C1.65672 12.8693 1.49779 11.7681 2.04269 11.0189C2.58759 10.2356 3.72281 10.0086 4.49475 10.5421L14.4846 17.7053C14.6663 17.8415 15.1658 18.2048 15.529 17.7848C15.8923 17.3874 15.495 16.9333 15.336 16.7631L6.06134 6.97753C5.39157 6.23964 5.43698 5.01361 6.3338 4.18491C7.04898 3.52648 8.30907 3.50378 8.99019 4.20761L18.106 13.698C18.2422 13.8342 18.6622 14.2656 19.0936 13.9477C19.5363 13.6072 19.2185 13.1077 19.139 12.9147L13.4743 3.51513C13.0883 2.91347 13.077 1.67609 14.1214 1.05172C15.1998 0.416001 16.2329 1.05172 16.6302 1.7215L22.9306 11.8476C23.8274 13.3461 25.2351 14.6062 26.4838 15.1965C27.4488 15.6506 28.198 15.0716 28.3229 14.0613C28.5159 12.4947 28.8224 10.5535 29.3673 8.91875C29.9349 7.20457 31.9328 6.35316 33.6357 7.21593L33.0567 9.4977C32.4777 11.8135 32.4096 14.2429 32.807 16.6041C33.1475 18.5794 33.4881 21.1223 33.4427 23.3814C33.3859 26.787 31.0928 28.2741 29.0381 30.1245C20.172 38.1732 13.724 27.2297 10.5795 25.6745L1.44103 20.6001C0.669084 20.1574 0.498802 19.1243 0.952887 18.3751C1.39562 17.6485 2.30379 17.3307 3.07574 17.728Z" fill="#FFD869" />
                                <path d="M30.9791 7.17055C31.2515 7.22731 31.5126 7.30678 31.7737 7.43165L31.1948 9.71343C30.6158 12.0293 30.5477 14.4586 30.945 16.8199C31.2856 18.7951 31.6261 21.338 31.5807 23.5971C31.524 27.0027 29.2308 28.4898 27.1761 30.3402C25.496 31.8614 23.9067 32.7015 22.4082 33.0534C24.4289 33.0875 26.6425 32.3042 29.0265 30.1359C31.0812 28.2855 33.363 26.7984 33.4311 23.3927C33.4765 21.1223 33.136 18.5794 32.7954 16.6155C32.3867 14.2543 32.4662 11.8249 33.0451 9.50909L33.6241 7.22731C32.75 6.78458 31.7851 6.80728 30.9791 7.17055Z" fill="#F2C34E" />
                                <path d="M30.9566 15.696C31.2971 17.6712 31.6377 20.2141 31.5923 22.4732C31.5355 25.8788 29.2424 27.366 27.1877 29.2164C23.6458 32.429 20.4899 32.6106 17.7767 31.5776C20.8645 33.4507 24.6561 34.1205 29.0381 30.1359C31.0928 28.2855 33.3746 26.7983 33.4427 23.3927C33.4881 21.1223 33.1475 18.5794 32.807 16.6155C32.4096 14.2542 30.5479 13.3347 30.9566 15.696ZM7.12844 4.41195L17.2318 14.8219C17.3681 14.9581 17.7881 15.3895 18.2195 15.0716C18.6622 14.731 18.3443 14.2315 18.2649 14.0386L17.8221 13.3007L8.99019 4.21896C8.36583 3.57189 7.27602 3.53784 6.54949 4.02598C6.76518 4.1168 6.95816 4.24167 7.12844 4.41195ZM2.54218 10.8146L13.6219 18.7497C13.8262 18.8973 14.3825 19.2946 14.7798 18.8292C15.1317 18.4545 14.8479 18.0232 14.6549 17.7961L4.59692 10.5875C3.92714 10.1221 2.97357 10.1902 2.31514 10.6897C2.39461 10.7351 2.47407 10.7691 2.54218 10.8146ZM14.7684 1.92583L21.0689 12.0519C21.9657 13.5504 23.3733 14.8105 24.6221 15.4008C25.2918 15.7187 25.8595 15.5143 26.1887 15.0262C25.0194 14.3905 23.7707 13.2326 22.9306 11.8476L16.6302 1.7215C16.2329 1.05172 15.1998 0.416001 14.1214 1.05172C14.0532 1.08578 14.0078 1.13119 13.9511 1.17659C14.303 1.36958 14.5981 1.64203 14.7684 1.92583ZM10.886 23.0976C11.1698 23.2451 11.8169 23.597 12.1688 23.0181C12.305 22.791 12.271 22.5981 12.1915 22.4278L3.1779 17.8188C2.46272 17.4555 1.66807 17.6145 1.11182 18.1026L10.886 23.0976Z" fill="#F2C34E" />
                                <path d="M22.5671 33.6323C18.4804 33.6323 15.1542 30.4765 12.8384 28.2855C11.8394 27.3319 10.9653 26.5146 10.3295 26.1967L1.16837 21.111C0.691585 20.8385 0.351021 20.3958 0.214795 19.8509C0.0558655 19.2606 0.158035 18.6248 0.464542 18.0913C1.0662 17.0696 2.29223 16.695 3.32528 17.2172L11.7713 21.531C11.8621 21.5764 12.0778 21.6786 12.1459 21.6786C12.1118 21.6445 12.021 21.5537 11.8507 21.4175L2.01978 13.891C1.55566 13.5121 1.25122 12.9723 1.16708 12.3791C1.08293 11.7859 1.22525 11.1827 1.5657 10.6897C1.91761 10.1902 2.47387 9.82694 3.10959 9.72477C3.7226 9.61125 4.32427 9.74747 4.80106 10.088L14.8023 17.2512C15.0066 17.4102 15.0861 17.4215 15.1088 17.4215C15.0974 17.4102 15.0747 17.3193 14.9272 17.1604L5.64111 7.37488C4.73294 6.35318 4.85782 4.77524 5.93627 3.77625C6.9012 2.90214 8.5132 2.92484 9.38732 3.82166L18.5031 13.312C18.662 13.471 18.7301 13.4937 18.7642 13.505C18.7528 13.4483 18.6734 13.2893 18.6507 13.2326L12.9746 3.82166C12.6681 3.35622 12.5659 2.6751 12.7135 2.06208C12.8611 1.43771 13.247 0.926868 13.8146 0.586304C15.0974 -0.174288 16.4937 0.427374 17.1068 1.44907L23.3958 11.5752C24.1905 12.9034 25.496 14.1294 26.7107 14.7197C26.8809 14.7992 27.142 14.8673 27.3464 14.7538C27.5507 14.6402 27.6983 14.3791 27.7437 14.0159C27.9253 12.6082 28.2205 10.5194 28.8108 8.77119C29.1287 7.79491 29.8666 7.01161 30.8315 6.61428C31.8078 6.21696 32.9203 6.26237 33.8852 6.73916C34.1236 6.86403 34.2485 7.12513 34.1804 7.38623L33.6014 9.66801C33.0452 11.893 32.9657 14.2089 33.363 16.536C33.8284 19.2038 34.0441 21.5196 34.0101 23.4268C33.9533 26.6394 32.0575 28.2855 30.2185 29.8861C29.9574 30.1132 29.6849 30.3516 29.4238 30.59C26.9718 32.7923 24.6673 33.6323 22.5671 33.6323ZM2.36035 18.1253C1.99708 18.1253 1.65652 18.3183 1.45218 18.6702V18.6816C1.29325 18.9427 1.24784 19.2719 1.31595 19.5671C1.36136 19.7373 1.47488 19.9757 1.72463 20.1233L10.8517 25.1977C11.6237 25.5723 12.5432 26.4465 13.6103 27.4681C17.2316 30.8965 22.1812 35.5963 28.6519 29.7272C28.9243 29.4775 29.1968 29.2504 29.4692 29.012C31.2629 27.4454 32.8181 26.1059 32.8749 23.3927C32.9089 21.565 32.6932 19.3173 32.2505 16.7177C31.8191 14.2316 31.9099 11.7568 32.5003 9.37285L32.9543 7.56786C32.3981 7.39758 31.8078 7.42029 31.2629 7.64733C30.6044 7.91978 30.105 8.45333 29.8893 9.11175C29.333 10.7805 29.0378 12.7785 28.8676 14.1407C28.7768 14.8559 28.4248 15.4349 27.9026 15.73C27.4145 16.0025 26.8128 16.0025 26.2339 15.73C24.8035 15.0489 23.3504 13.6753 22.4423 12.1541L16.1418 2.02802C15.9602 1.73287 15.2677 1.02904 14.405 1.55123C14.1263 1.71199 13.9216 1.9754 13.8346 2.28513C13.7476 2.59485 13.7853 2.92632 13.9395 3.20865L19.6156 12.6196C20.1151 13.6072 19.7859 14.118 19.4339 14.3905C19.1274 14.6175 18.5031 14.89 17.7084 14.1067L8.58132 4.60496C8.12723 4.15087 7.21906 4.15087 6.71956 4.60496C6.02709 5.25203 6.04979 6.12614 6.48117 6.60293L15.7445 16.3658C16.437 17.0923 16.3008 17.7734 15.9375 18.1707C15.7786 18.3524 15.1542 18.9313 14.1325 18.1594L4.14263 11.0076C3.91559 10.8486 3.62043 10.7805 3.30257 10.8373C2.97336 10.894 2.67821 11.0757 2.49657 11.3368C2.13331 11.8476 2.23547 12.6082 2.71226 12.9942L12.5319 20.5093C13.44 21.2245 13.3379 21.8602 13.0881 22.2575C12.827 22.6889 12.2935 23.0862 11.2604 22.5413L2.80308 18.2162C2.66686 18.1594 2.51928 18.1253 2.36035 18.1253ZM7.94559 31.5322C6.30888 31.5289 4.70511 31.0721 3.31236 30.2124C1.9196 29.3527 0.792384 28.1238 0.0558655 26.6621C-0.00881133 26.5264 -0.0176952 26.3707 0.031121 26.2285C0.0799373 26.0863 0.182562 25.9689 0.316964 25.9015C0.600768 25.7653 0.941332 25.8788 1.07756 26.1513C1.73736 27.4569 2.75461 28.5481 4.01078 29.2978C5.26694 30.0475 6.71029 30.4248 8.17264 30.3856C8.4905 30.397 8.7516 30.624 8.7516 30.9419C8.75466 31.0168 8.74253 31.0916 8.71595 31.1617C8.68937 31.2319 8.64888 31.2959 8.59692 31.35C8.54496 31.4041 8.4826 31.4471 8.41359 31.4764C8.34458 31.5058 8.27034 31.5209 8.19534 31.5209C8.11588 31.5322 8.03641 31.5322 7.94559 31.5322ZM7.88883 28.7169H7.83207C6.75773 28.6116 5.72512 28.2465 4.8233 27.6532C3.92147 27.0599 3.17749 26.2561 2.6555 25.3112C2.61908 25.2458 2.59606 25.1738 2.58777 25.0993C2.57948 25.0249 2.58609 24.9495 2.60723 24.8777C2.62836 24.8058 2.66359 24.7389 2.71086 24.6808C2.75813 24.6227 2.81649 24.5746 2.88255 24.5393C3.155 24.3917 3.50691 24.4825 3.65449 24.7663C4.5286 26.3556 6.14061 27.4114 7.94559 27.593C8.2521 27.6271 8.4905 27.8995 8.45644 28.2174C8.42238 28.5012 8.17264 28.7169 7.88883 28.7169Z" fill="#455A64" />
                                <path d="M26.9717 8.05602C26.6879 8.05602 26.4382 7.84033 26.4041 7.54518C26.2416 6.09177 25.6699 4.71434 24.7556 3.57293C23.8413 2.43153 22.6218 1.57302 21.2389 1.09717C21.1688 1.07332 21.1042 1.0359 21.0485 0.987047C20.9929 0.938196 20.9475 0.878872 20.9148 0.812461C20.8821 0.74605 20.8629 0.673853 20.8581 0.599992C20.8533 0.526131 20.8631 0.452052 20.887 0.381985C20.9108 0.311918 20.9483 0.247236 20.9971 0.19163C21.046 0.136025 21.1053 0.090586 21.1717 0.0579076C21.2381 0.0252292 21.3103 0.00595144 21.3842 0.0011749C21.458 -0.00360163 21.5321 0.00621665 21.6022 0.0300692C24.8262 1.13123 27.1534 4.03737 27.528 7.43166C27.562 7.73816 27.335 8.02197 27.0285 8.05602H26.9717ZM24.2132 8.62363C23.9407 8.62363 23.691 8.41929 23.6569 8.13549C23.5231 7.25014 23.1763 6.41053 22.6464 5.68879C22.1164 4.96705 21.4192 4.38476 20.6145 3.99196C20.4791 3.92572 20.3754 3.80838 20.3265 3.66574C20.2775 3.5231 20.2872 3.36685 20.3534 3.23137C20.4197 3.09588 20.537 2.99226 20.6797 2.9433C20.8223 2.89433 20.9785 2.90403 21.114 2.97027C22.0829 3.44521 22.9224 4.14756 23.5609 5.01736C24.1994 5.88716 24.618 6.89856 24.7808 7.96521C24.8262 8.27171 24.6105 8.56687 24.304 8.61228C24.2699 8.61228 24.2472 8.62363 24.2132 8.62363Z" fill="#455A64" />
                            </svg>
                        </div>
                    </div>
                    <div className="mainDashboard ">
                        <h1>Edit IP Address</h1>
                        <div className="QR wifi">
                            <h2 className="text-center">Edit IP Address</h2>
                            <div className="background ">
                                <img className='w-75' src={wifi} />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <div className="createQR  mt-3 ">
                                    <div className='wInput d-flex justify-content-center '>
                                        <label className='' >IP Address</label>
                                        <input type="text " id='input' name="IPAddress" value={IPdata} placeholder="Enter IP Address" onChange={onChange} />
                                        <button className='IPbtn' onClick={getIPAddress}> Network IP</button>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex me-4 wifibtns'>
                                <button className='editBtn' onClick={onSubmit}>Edit</button>
                            </div>
                            <div className='err ms-4'>
                                    {
                                        errorList.length > 0 && errorList.map((error, index) =>
                                            <div className=' message alert alert-danger my-1 w-100' key={index} >{error.message}</div>
                                        )}
                                </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


export default Edit_IPAddress;