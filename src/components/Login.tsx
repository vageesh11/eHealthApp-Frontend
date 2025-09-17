import React from "react";

interface LoginProps {
  credentials: any; 
  setCredentials: (field: string, value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onLogin: () => void;
  type?: "user" | "admin"; 
}

const Login: React.FC<LoginProps> = ({
  credentials,
  setCredentials,
  isOpen,
  setIsOpen,
  onLogin,
  type = "user",
}) => {
  return (
    <>
      {/* Login Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[rgb(0,109,111)] text-white rounded-lg shadow hover:bg-teal-700 transition"
      >
        {type === "admin" ? "Admin Login" : "Login"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-sm p-6">
            <h2 className="text-xl font-semibold text-center mb-4 text-[rgb(0,109,111)]">
              {type === "admin" ? "Admin Login" : "User Login"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onLogin();
              }}
              className="flex flex-col gap-4"
            >
              {/* Conditional Fields */}
              {type === "admin" ? (
                <>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials("username", e.target.value)
                      }
                      required
                      placeholder="Enter your username"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,109,111)]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      Secret Key
                    </label>
                    <input
                      type="password"
                      value={credentials.secretKey}
                      onChange={(e) =>
                        setCredentials("secretKey", e.target.value)
                      }
                      required
                      placeholder="Enter secret key"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,109,111)]"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials("email", e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,109,111)]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials("password", e.target.value)
                      }
                      required
                      placeholder="Enter your password"
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(0,109,111)]"
                    />
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[rgb(0,109,111)] text-white rounded-lg hover:bg-teal-700 transition"
                >
                  {type === "admin" ? "Login as Admin" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
