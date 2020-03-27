import React, { useState, useEffect } from "react";
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
  const [buttonDisabled, setButtonDisabled] = useState(true);

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
      setButtonDisabled(!valid);
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
    // Reach will allow us to "reach" into the schema and test only one part.
    yup
      .reach(formSchema, e.target.name)
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
      <label htmlFor='name'>
        Name
        <input
          type='text'
          name='name'
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
      </label>
      <label htmlFor='sauce'>
        Sauce
        <input
          type='text'
          name='sauce'
          value={formState.sauce}
          onChange={inputChange}
        />
        {errors.sauce.length > 0 ? (
          <p className='error'>{errors.sauce}</p>
        ) : null}
      </label>
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
      <label htmlFor='size'>
        Select your Pizza Size
        <select id='size' name='size' onChange={inputChange}>
          <option value='small'>Small</option>
          <option value='medium'>Medium</option>
          <option value='Large'>Large</option>
        </select>
      </label>

      <label htmlFor='cheese' className='cheese'>
        <input
          type='checkbox'
          name='cheese'
          checked={formState.cheese}
          onChange={inputChange}
        />
        Cheese
      </label>


      <label htmlFor='meat' className='meat'>
        <input
          type='checkbox'
          name='meat'
          checked={formState.meat}
          onChange={inputChange}
        />
        Meat
      </label>

      <label htmlFor='mushrooms' className='mushrooms'>
        <input
          type='checkbox'
          name='mushrooms'
          checked={formState.mushrooms}
          onChange={inputChange}
        />
        Mushrooms
      </label>

      <label htmlFor='pineapple' className='pineapple'>
        <input
          type='checkbox'
          name='pineapple'
          checked={formState.pineapple}
          onChange={inputChange}
        />
        Pineapple
      </label>

      {/* displaying our post request data */}
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={buttonDisabled}>Add to Order</button>
    </form>
  );
}
