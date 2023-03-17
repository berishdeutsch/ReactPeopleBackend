import React from "react";
import { Button, Input } from "reactstrap";

export default function PersonRow({ person, onDeleteClick, onEditClick, isSetToDelete, onSetToDeleteChange  }) {
    const { firstName, lastName, age } = person;
    return (
        <tr>
            <td>
                <input
                    checked={isSetToDelete}
                    onChange={onSetToDeleteChange}
                    type="checkbox"
                    className="form-control" />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <Button className="btn btn-warning" onClick={onEditClick} >Edit</Button>
                <Button style={{ marginLeft: 10 }} className="btn btn-danger" onClick={onDeleteClick}>Delete</Button>
            </td>
        </tr>
    )
}