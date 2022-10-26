module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
  }, {
    underscored: true,
    timestamps: false,
  });

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, { through: PostCategory });
    Category.belongsToMany(BlogPost, { through: PostCategory });
  };

  return PostCategory;
};
