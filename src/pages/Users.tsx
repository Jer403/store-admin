import { useUser } from "../hooks/useUser";
import { UserInterface } from "../types";
import { createDateTextFromLanguage } from "../utils";

function UserCard({ user }: { user: UserInterface }) {
  const date = new Date(user.created_at);
  console.log();

  return (
    <div className="w-full flex flex-col p-2 bg-white dark:bg-gray-80 border-2 border-gray-400 dark:border-gray-5 gap-1 rounded-lg">
      <div className="flex">
        <div className="w-full mx-4 flex flex-row justify-between">
          <div className="flex flex-col justify-between items-start">
            <p className="w-full text-lg md:text-2xl flex items-start dark:text-gray-5">
              Username:{" "}
              <span className="ml-3 font-medium">{user.username}</span>
            </p>
            <p className="w-full text-lg md:text-2xl flex items-center justify-start dark:text-gray-5">
              Email: <span className="ml-4 font-medium">{user.email}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="w-full text-lg md:text-2xl flex justify-end dark:text-gray-5">
              <span className="ml-4 text-xl">{user.id}</span>
            </p>
            <p className="w-full text-lg md:text-2xl flex justify-end  dark:text-gray-5">
              Creado el {createDateTextFromLanguage("es", date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Users() {
  const { users, loadingUsers } = useUser();
  return (
    <>
      <div className="w-full p-10  mt-3 max-w-[1330px] flex flex-col gap-4 items-center">
        {loadingUsers ? (
          <span className="text-2xl">Cargando usuarios...</span>
        ) : users && users.length > 0 ? (
          <>
            {users.map((user) => {
              return <UserCard user={user}></UserCard>;
            })}
          </>
        ) : (
          <span className="text-2xl">No se encontro ningun usuario</span>
        )}
      </div>
    </>
  );
}
