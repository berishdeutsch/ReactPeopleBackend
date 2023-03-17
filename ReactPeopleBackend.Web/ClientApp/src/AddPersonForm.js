import React from 'react';

export default function AddPersonForm({ firstName, lastName, age, onAddClick, onUpdateClick, onCancelClick, onTextChange, isEditing }) {
    return <div className="row">
        <div className="col-md-3 md-offset-2">
            <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
        </div>
        <div className="col-md-3">
            <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
        </div>
        <div className="col-md-3">
            <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
        </div>
        <div className='col-md-3'>
            {!isEditing && <button className='btn btn-primary btn-block' onClick={onAddClick}>Add</button>}
            {isEditing && <div>
                <button className='btn btn-warning btn-block' onClick={onUpdateClick}>Update</button>
                <button className='btn btn-info btn-block' onClick={onCancelClick}>Cancel</button>
            </div>}
        </div>
    </div>
}