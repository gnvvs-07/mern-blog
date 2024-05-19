import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);
  const handleShowMore = async () => {
    // start index
    const startIndex = users.length;
    try {
      // show more posts logic
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {};

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-800 dark:scrollbar-track-slate-600">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Profilepicture</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row key={user._id}>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell className="text-blue-500">
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCircleCheck className="text-green-500" />
                    ) : (
                      <FaRegCircleXmark className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className="text-red-500 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              className="mx-auto"
              onClick={handleShowMore}
            >
              Show More
            </Button>
          )}
        </>
      ) : (
        <p>No users yet</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <IoIosWarning className="mx-auto text-red-700 text-4xl" />
            <h3 className="mt-2 text-red-500">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex flex-col gap-3">
              {/* button for delete account */}
              <Button
                gradientDuoTone="pinkToOrange"
                outline
                onClick={handleDeleteUser}
              >
                Yes Delete my Account
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                gradientDuoTone="cyanToBlue"
                outline
              >
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
