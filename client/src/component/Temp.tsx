import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
  name: string;
}
const Temp = () => {
  const [users, setUsers] = useState<User[] | null>();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/user/getusers", {
          signal: controller.signal,
        });
        console.log(response.data);
        let resUser = response.data.existingUsers.map((user: any) => {
          return { name: user.u_name };
        });
        isMounted && setUsers(resUser);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const goBack = () => navigate("/");
  return (
    <article className="flex flex-col items-center p-4 gap-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Users list</h2>
      {users?.length ? (
        <ul className="flex flex-col gap-y-2 w-full">
          {users.map((user, i) => (
            <li
              className="flex items-center gap-4 rounded-lg p-2 hover:bg-gray-100"
              key={i}
            >
              {user.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>no users to display</p>
      )}
      <button
        className="rounded-lg px-4 py-2 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600"
        onClick={goBack}
      >
        Home
      </button>
    </article>
  );
};

export default Temp;
