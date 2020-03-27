import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("Name must be at least 2 characters"),
  sauce: yup.string().required("Choose a pizza sauce"),

  pineapple: yup.boolean().oneOf([true], "pineaaple"),
  mushrooms: yup.boolean().oneOf([true], "Mushrooms"),
  meat: yup.boolean().oneOf([true], "Meat"),
    cheese: yup.boolean().oneOf([true], "Cheese"),

  size: yup.string(),
  instructions: yup.string().required("Include any special instructions")
});

export default function Form() {
  // state for whether our button should be disabled or not.
  const [button, setButton] = useState(true);

  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    sauce: "",
    pineapple: "",
    mushrooms: "",
    meat: "",
    cheese:"",
    size: "",
    instructions: ""
  });

  // state for our errors
  const [errors, setErrors] = useState({
    name: "",
    sauce: "",
    pineapple: "",
    mushrooms: "",
    meat: "",
    cheese:"",
    size: "",
    instructions: ""
  });

  // new state to set our post request too. So we can console.log and see it.
  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButton(!valid);
    });
}, [formState]);


  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data); // get just the form data from the REST api
        console.log("success", post);
        // reset form if successful
        setFormState({
            name: "",
            sauce: "",
            pineapple: "",
            mushrooms: "",
            meat: "",
            cheese:"",
            size: "",
            instructions: ""
        });
      })
      .catch(err => console.log(err.response));
  };

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name) 
    //   .validate(e.target.name === "pineapple" ? e.target.checked : e.target.value)
    //   .validate(e.target.name === "cheese" ? e.target.checked : e.target.value)
    //   .validate(e.target.name === "meat" ? e.target.checked : e.target.value)
    //   .validate(e.target.name === "mushrooms" ? e.target.checked : e.target.value)

      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
        <Link to={"/"}>
                <div>Home</div>
            </Link>

            <Link to={"/pizza"}>
                <div>Pizza</div>
            </Link>
            <div className="pizzaPictures">
            <img className="pizza resturant" src="https://images.unsplash.com/photo-1563245738-9169ff58eccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" 
            alt="pizzas on display" />
            </div>
      <label htmlFor='name'>
        Name
        <input
        id="name"
          type='text'
          name='name'
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
      </label> <br/>
      <label htmlFor='sauce'>
        Sauce
        <input
        id="sauce"
          type='text'
          name='sauce'
          value={formState.sauce}
          onChange={inputChange}
        />
        {errors.sauce.length > 0 ? (
          <p className='error'>{errors.sauce}</p>
        ) : null}
      </label>
      <br/>
      <label htmlFor='Instructions'>
        Special Instructions
        <textarea
          name='instructions'
          value={formState.motivation}
          onChange={inputChange}
        />
        {errors.instructions.length > 0 ? (
          <p className='error'>{errors.instructions}</p>
        ) : null}
      </label>
      <br/>
      <label htmlFor='size'>
        Select your Pizza Size
        <select id='size' name='size' onChange={inputChange}>
          <option value='small'>Small</option>
          <option value='medium'>Medium</option>
          <option value='Large'>Large</option>
        </select>
      </label>
      <br/>
      <label htmlFor='cheese' className='cheese'>
        <input
          type='checkbox'
          name='cheese'
          checked={formState.cheese}
          onChange={inputChange}
        />
         {/* {errors.cheese.length > 0 ? <p className="error">{errors.cheese}</p> : null}  */}
        Cheese
      </label>

      <label htmlFor='meat' className='meat'>
        <input
          type='checkbox'
          name='meat'
          checked={formState.meat}
          onChange={inputChange}
        />
           {/* {errors.meat.length > 0 ? <p className="error">{errors.meat}</p> : null}  */}
        Meat
      </label>

      <label htmlFor='mushrooms' className='mushrooms'>
        <input
          type='checkbox'
          name='mushrooms'
          checked={formState.mushrooms}
          onChange={inputChange}
        />
         {/* {errors.mushrooms.length > 0 ? <p className="error">{errors.mushrooms}</p> : null}  */}
        Mushrooms
      </label>

      <label htmlFor='pineapple' className='pineapple'>
        <input
          type='checkbox'
          name='pineapple'
          checked={formState.pineapple}
          onChange={inputChange}
        />
           {/* {errors.pineapple.length > 0 ? <p className="error">{errors.pineapple}</p> : null}  */}
        Pineapple
      </label>

      <pre>{JSON.stringify(post, null, 2)}</pre>
              <button disabled={button}>Add to Order</button>
    </form>
  );
}
