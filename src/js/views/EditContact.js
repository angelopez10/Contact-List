import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = props => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getSpecificContact(props);
	}, []);

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form onSubmit={e => actions.updateContact(e)} id={store.contact.id}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full name"
							name="full_name"
							onChange={e => actions.createContact(e)}
							value={store.contact.full_name || ""}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Email"
							name="email"
							onChange={e => actions.createContact(e)}
							value={store.contact.email || ""}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Phone Number"
							name="phone"
							onChange={e => actions.createContact(e)}
							value={store.contact.phone || ""}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Address"
							name="address"
							onChange={e => actions.createContact(e)}
							value={store.contact.address || ""}
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
