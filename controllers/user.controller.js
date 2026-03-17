export const userController = {
  getAll: (req, res) => {
    console.log("test");
    res.status(200).json({ message: "user controller" });
  },
};
