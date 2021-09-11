import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCountryList } from '../../services/user';
import firebase from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../../store/user/actions';
import { useHistory } from 'react-router-dom';

const CreateCustomer = () => {
    const [countryList, setCountryList] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [progress, setProgress] = useState(0);
    const [file, setFile]: any = useState('');
    const [fileName, setFileName] = useState('');
    const [downloadURL, setDownloadURL] = useState('');
    const { register, setError, handleSubmit, setValue, getValues, errors, trigger, control, watch } = useForm({
        defaultValues: {
            customerName: '',
            email: '',
            phone: '',
            country: '',
            additionalInfo: '',
            uploadFile:''
        }
    });

    useEffect(() => {
        fetchCountryList();
    }, []);

    const fetchCountryList = () => {
        getCountryList().then((success:any) => {
            if (success) {
                if (success.response && success.response.status === 200 && success.response.data) {
                    setCountryList(success.response.data);
                    setValue('country', success.response.data[0].name);
                }
            }
        }).catch((err) => {
            
        })
    }

    const handleRegister = (data:any) => {
        if (file && file[0].type && file[0].type !== 'application/pdf') {
            toast.error('Please select PDF file.');
            return;
        } else {
            console.log('fileNamw2',fileName)
            dispatch(addCustomer({
                id: Math.random(),
                customerName: data.customerName,
                phone: data.phone,
                email: data.email,
                country: data.country,
                additionalInfo: data.additionalInfo,
                pdfURL: downloadURL,
                fileName: fileName
            }));
            history.push({ pathname: '/customerlist' });
        }
    }

    const handleChange = (e: any) => {
        const { files} = e.target
        console.log('selectedFile', files[0].name);
        if (files[0].type !== 'application/pdf') {
            toast.error('Please select PDF file.');
            setFile(files);
            return;
        } else {
            setFile(files);
            let bucketName = 'pdfFiles';
            let selectedFile = files[0];
            let stotrageRef = firebase.storage().ref(`${bucketName}/${selectedFile.name}`);
            let uploadTask = stotrageRef.put(selectedFile);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
                const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                stotrageRef.getDownloadURL().then((url) => {
                    const URL: any = url;
                    setDownloadURL(URL);
                    setFileName(selectedFile.name);
                }).catch((error) => { throw error });
            });

        }
    }
    
    return (
        <div className="min-vh-100 d-flex">
            <div className="form-signin" style={{maxWidth:'550px'}}>
                <div className="card shadow-sm" style={{ borderRadius: '10px' }}>
                    <div className="card-header fw-bold"><i className="bi bi-person-plus"></i> Add Customer</div>
                    <div className="card-body p-4 row ">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium" htmlFor="email">Customer Name</label>
                            <input type="text" className="form-control" name="customerName" placeholder="Customer Name"
                                ref={register({
                                    required: true,
                                    pattern: /^[A-Z]+$/i
                                })}/>
                            {
                                (errors && errors.customerName && errors.customerName.type === 'required') &&
                                <div className="text-danger error">Customer name is required</div>
                            }
                            {
                                (errors && errors.customerName && errors.customerName.type === 'pattern') &&
                                <div className="text-danger error">Please enter alphabets only</div>
                            }
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium" htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" placeholder="Email address"
                                ref={register({
                                    required: true,
                                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })} />
                            {
                                (errors && errors.email && errors.email.type === 'required') &&
                                <div className="text-danger error">Email is required</div>
                            }
                            {
                                (errors && errors.email && errors.email.type === 'pattern') &&
                                <div className="text-danger error">Email is invalid</div>
                            }
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium" htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" minLength={10} maxLength={10} name="phone" placeholder="Phone"
                                ref={register({
                                    required: true,
                                    pattern: /^[0-9]*$/
                                })} />
                            {
                                (errors && errors.phone && errors.phone.type === 'required') &&
                                <div className="text-danger error">Phone is required</div>
                            }
                            {
                                (errors && errors.phone && errors.phone.type === 'pattern') &&
                                <div className="text-danger error">Please enter digit only</div>
                            }
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-medium" htmlFor="Country">Country</label>
                            <select className="form-select" name="country"  ref={register}>
                                {
                                    (countryList && countryList.length > 0) &&
                                    countryList.map((country: any) => {
                                        return (
                                            <option className="dropdown-item" key={country.alpha2Code} value={country.name}>{country.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-medium" htmlFor="phone">Additional Info</label>
                            <textarea rows={3} name="additionalInfo" className="form-control" ref={register({
                                required: true,
                                pattern:/^[a-zA-Z0-9,_.\s]+$/
                            })} />
                            {
                                (errors && errors.additionalInfo && errors.additionalInfo.type === 'required') &&
                                <div className="text-danger error">Additional info required</div>
                            }
                            {
                                (errors && errors.additionalInfo && errors.additionalInfo.type === 'pattern') &&
                                <div className="text-danger error">Phone number is Invalid</div>
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-medium" htmlFor="phone">Uplaod File</label>
                            <input className="form-control"  type="file" id="file_input" name="uploadfile" accept=".pdf" onChange={(e:any)=>{handleChange(e)} } />
                        </div>
                        <div id="progress_wrapper" className="mb-3">
                            <label id="progress_status">{progress}% Uploaded</label>
                            <div className="progress mb-3">
                                <div id="progress" className="progress-bar progress-bar-striped" role="progressbar" style={{ width: progress+'%'}} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                        </div>
                        <div className=" d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={handleSubmit(handleRegister)}><i className="bi bi-person-plus"></i> Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCustomer
