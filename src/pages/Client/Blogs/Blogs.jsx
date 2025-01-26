import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import moment from "moment";
import { FaUser } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

const fake_data = [
  {
    id: 1,
    imageUrl:
      "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2017/08/blog-01.jpg",
    title: "Blog Post With Image",
    author: "CiyaShop",
    category: "Hanging Lamps",
    comments: [],
    content: `I truly believe Augustine’s words are true and if you look at history you know it is true. There are many people in the world with amazing talents who realize only a small percentage of their potential. We all know people who live this truth. we also know those epic stories, those modern-day legends surrounding […]`,
    createdAt: new Date(),
  },
  {
    id: 2,
    imageUrl:
      "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2017/08/blog-01.jpg",
    title: "Blog Post With Image",
    author: "CiyaShop",
    category: "Hanging Lamps",
    comments: [],
    content: `I truly believe Augustine’s words are true and if you look at history you know it is true. There are many people in the world with amazing talents who realize only a small percentage of their potential. We all know people who live this truth. we also know those epic stories, those modern-day legends surrounding […]`,
    createdAt: new Date(),
  },
  {
    id: 3,
    imageUrl:
      "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2017/08/blog-01.jpg",
    title: "Blog Post With Image",
    author: "CiyaShop",
    category: "Hanging Lamps",
    comments: [],
    content: `I truly believe Augustine’s words are true and if you look at history you know it is true. There are many people in the world with amazing talents who realize only a small percentage of their potential. We all know people who live this truth. we also know those epic stories, those modern-day legends surrounding […]`,
    createdAt: new Date(),
  },
  {
    id: 4,
    imageUrl:
      "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2017/08/blog-01.jpg",
    title: "Blog Post With Image",
    author: "CiyaShop",
    category: "Hanging Lamps",
    comments: [],
    content: `I truly believe Augustine’s words are true and if you look at history you know it is true. There are many people in the world with amazing talents who realize only a small percentage of their potential. We all know people who live this truth. we also know those epic stories, those modern-day legends surrounding […]`,
    createdAt: new Date(),
  },
  {
    id: 5,
    imageUrl:
      "https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2017/08/blog-01.jpg",
    title: "Blog Post With Image",
    author: "CiyaShop",
    category: "Hanging Lamps",
    comments: [],
    content: `I truly believe Augustine’s words are true and if you look at history you know it is true. There are many people in the world with amazing talents who realize only a small percentage of their potential. We all know people who live this truth. we also know those epic stories, those modern-day legends surrounding […]`,
    createdAt: new Date(),
  },
];

export default function Blogs() {
  const [blogList, setBlogList] = useState([]);
  const [recentBlogList, setRecentBlogList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setBlogList(fake_data);
    setRecentBlogList(fake_data);
  }, []);
  return (
    <>
      <section className="py-10 lg:py-20 mt-[90px] xl:mt-0 xl:h-[450px] xl:pt-[90px] bg-no-repeat bg-cover bg-bottom bg-[url('https://ciyashop.potenzaglobalsolutions.com/decor/wp-content/uploads/sites/84/2020/08/page-header-1.jpg')]">
        <div className="max-w-full lg:max-w-[1300px] mx-auto px-4 py-2 h-full flex flex-col justify-center gap-y-5">
          <h1 className="text-[22px] text-center lg:text-left lg:text-4xl font-semibold text-[#323232]">
            Blog
          </h1>
          <Breadcrumbs
            aria-label="breadcrumb"
            className="flex items-center justify-center lg:justify-start"
          >
            <Link to={"/"} className="flex items-center">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              <span className="text-sm">Trang chủ</span>
            </Link>
            <Typography
              sx={{
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              Blog
            </Typography>
          </Breadcrumbs>
        </div>
      </section>

      <section className="grid grid-cols-12 mx-auto max-w-[1300px] px-[15px] gap-[30px] py-[60px]">
        <div className="col-span-9">
          {blogList.map((blog) => (
            <article key={blog.id} className="mb-[60px]">
              <div className="mb-6">
                <img
                  alt={blog.title}
                  src={blog.imageUrl}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <span>{moment(blog.createdAt).format("LL")}</span>
                <h3 className="mb-[5px] font-medium text-2xl hover:text-primary text-secondary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-[#BBBBBB] flex items-center gap-2 uppercase text-xs mb-[15px]">
                  <span className="flex items-center">
                    <FaUser className="mr-1" /> {blog.author}
                  </span>{" "}
                  /{" "}
                  <span className="flex items-center">
                    <IoIosDocument className="mr-1" /> {blog.category}
                  </span>
                </p>
                <p className="text-[#777777] text-[15px] mb-[15px] line-clamp-3">
                  {blog.content}
                </p>
                <button className="px-[18px] bg-secondary text-white rounded-sm text-[13px] uppercase leading-[30px] hover:bg-opacity-80">
                  Xem thêm
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="col-span-3">
          <div className="relative mb-[30px]">
            <input
              id="blog-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full h-[46px] pl-[15px] pr-[30px] outline-none border border-solid border-gray-300 focus:border-primary transition-all rounded text-sm"
            />
            <label
              htmlFor="blog-search"
              className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-[#bbbbbb] hover:text-primary transition-colors"
            >
              <IoSearchOutline className="text-xl font-medium" />
            </label>
          </div>
          <div>
            <h2 className="text-secondary mb-[15px] uppercase font-medium">
              Bài viết gần đây
            </h2>
            <div>
              {recentBlogList.map((blog) => (
                <article
                  key={blog.id}
                  className="mb-[10px] pb-[10px] border-b border-solid border-gray-300"
                >
                  <div className="flex gap-3 items-center">
                    <div className="size-14 rounded-sm overflow-hidden">
                      <img
                        alt={blog.title}
                        src={blog.imageUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="line-clamp-1 text-secondary hover:text-primary transition-colors text-sm">
                      <Link to={`#`}>{blog.title}</Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
