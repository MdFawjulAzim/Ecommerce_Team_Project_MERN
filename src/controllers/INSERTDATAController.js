import UserModel from "../models/UserModel.js";

export const UserMODELDataINSERTMany = async (req, res) => {
  try {
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "hashed_password_1",
        avatar: "https://example.com/avatar1.jpg",
        verify_otp: 123456,
        verify_email: true,
        forgot_password_otp: "",
        refresh_token: "",
        role: "ADMIN",
        status: "ACTIVE",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "hashed_password_2",
        avatar: "https://example.com/avatar2.jpg",
        verify_otp: 654321,
        verify_email: false,
        forgot_password_otp: "987654",
        refresh_token: "",
        role: "USER",
        status: "ACTIVE",
      },
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "hashed_password_3",
        avatar: "https://example.com/avatar3.jpg",
        verify_otp: 345678,
        verify_email: true,
        forgot_password_otp: "",
        refresh_token: "some_refresh_token",
        role: "USER",
        status: "INACTIVE",
      },
      {
        name: "Bob Williams",
        email: "bob@example.com",
        password: "hashed_password_4",
        avatar: "https://example.com/avatar4.jpg",
        verify_otp: 876543,
        verify_email: false,
        forgot_password_otp: "123123",
        refresh_token: "",
        role: "USER",
        status: "SUSPENDED",
      },
      {
        name: "Charlie Brown",
        email: "charlie@example.com",
        password: "hashed_password_5",
        avatar: "https://example.com/avatar5.jpg",
        verify_otp: 234567,
        verify_email: true,
        forgot_password_otp: "",
        refresh_token: "another_refresh_token",
        role: "ADMIN",
        status: "ACTIVE",
      },
    ];

    const insertedUsers = await UserModel.insertMany(users);
    return res.status(200).json({
      success: true,
      message: "User data inserted successfully!",
      data: insertedUsers,
    });
  } catch (err) {
    console.error("Error in inserting user data:", err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const UserMODELDataINSERTOne = async (req, res) => {
  try {
    const users = {
      name: "John Doe",
      email: "johnn@example.com",
      password: "hashed_password_1",
      avatar: "https://example.com/avatar1.jpg",
      verify_otp: 123456,
      verify_email: true,
      forgot_password_otp: "",
      refresh_token: "",
      role: "ADMIN",
      status: "ACTIVE",
    };

    const insertedUsers = await UserModel.create(users);
    return res.status(200).json({
      success: true,
      message: "User One data inserted successfully!",
      data: insertedUsers,
    });
  } catch (err) {
    console.error("Error in inserting user data:", err);
    return res.status(500).json({
      error: err.message,
    });
  }
};
