import React, { ReactElement } from "react";
import { addUser, editUser, getUsers } from "@/api/users";
import { NewUser, User, UserFormData } from "@/types/user";
import { normalizeUserData } from "./utils";
import AddIcon from "@/assets/add.svg";
import Modal from "@/shared/Modal/Modal";
import Form from "../Form/Form";
import styles from "./Users.module.css";

export default function Users() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User>(null);
  const [users, setUsers] = React.useState<User[]>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();

        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
    setUser(null);
  };

  const handleAdd = () => setIsOpen(true);

  const handleEdit = (user: User) => () => {
    setIsOpen(true);
    setUser(user);
  };

  const handleSubmit = async (formData: UserFormData) => {
    const data: NewUser = normalizeUserData(formData);

    handleModalClose();

    if (user) {
      const updatedUser = await editUser(user.id, data);

      setUsers((prev) =>
        prev.map((item) => (item.id === user.id ? updatedUser : item))
      );
    } else {
      const createdUser = await addUser(data);

      setUsers((prev) => [...prev, createdUser]);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const usersElements: ReactElement<HTMLTableRowElement>[] = users.map(
    (user: User) => (
      <tr key={user.id}>
        <td>{user.country}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.age}</td>
        <td>
          <button
            className={styles.editButton}
            data-testid={`edit-user-btn-${user.id}`}
            onClick={handleEdit(user)}
          >
            Edit
          </button>
        </td>
      </tr>
    )
  );

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>Users</div>
        <button
          className={styles.addButton}
          data-testid="add-user-btn"
          onClick={handleAdd}
        >
          <AddIcon />
          Add user
        </button>
      </div>
      <table className={styles.users}>
        <thead>
          <tr>
            <th>Country</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{usersElements}</tbody>
      </table>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        title={user ? "Edit User" : "Add User"}
      >
        <Form
          formData={user}
          onCancel={handleModalClose}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}
