const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contact: {
				full_name: "",
				email: "",
				phone: "",
				agenda_slug: "angelopez10",
				address: ""
			},

			contactList: []
		},
		actions: {
			createContact: e => {
				e.preventDefault();
				const { contact } = getStore();
				contact[e.target.name] = e.target.value;
				setStore({ contact: contact });
			},

			submitData: e => {
				e.preventDefault();
				const store = getStore();
				console.log(store.contact);
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(store.contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/angelopez10", {
							method: "GET",
							headers: {
								"Content-Type": "application/json"
							}
						})
							.then(resp => {
								return resp.json();
							})
							.then(data => {
								console.log(data);
								setStore({ contactList: data });
							})
							.catch(error => {
								console.log(error);
							});
					})
					.catch(error => {
						console.log(error);
					});
			},

			getContactList: () => {
				const store = getStore();
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/angelopez10", {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						console.log(data);
						setStore({ contactList: data });
					})
					.catch(error => {
						console.log(error);
					});
			},

			onDelete: e => {
				const store = getStore();

				console.log(e.target.id);

				fetch(`https://assets.breatheco.de/apis/fake/contact/${e.target.id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (resp.ok === true) {
							fetch("https://assets.breatheco.de/apis/fake/contact/agenda/angelopez10", {
								method: "GET",
								headers: {
									"Content-Type": "application/json"
								}
							})
								.then(resp => {
									return resp.json();
								})
								.then(data => {
									setStore({ contactList: data });
								})
								.catch(error => {
									console.log(error);
								});
						}
					})
					.then(data => {
						console.log("Se ha eliminado el contacto");
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	};
};

export default getState;
