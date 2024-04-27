import axios from "axios"
import { user } from "../Authentication/user";

export const FetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/get-posts/`);
        const data = response.data;
        const posts = data.posts;
        return posts;
      } catch (error) {
        console.error('Error while fetching posts in Posts.jsx :', error)
        return [];
      }
    }

export const FetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/get-posts/${user.id}`);
        const data = response.data;
        return data;
      } catch (error) {
        console.error('Error while fetchin user\'s posts in Posts.jsx :', error)
      }
    }

/*export const posts = [
  {
    id: 1,
    author: 'John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/22/b2/84/22b2840fc98275cbe1aa1f325b3276f4.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 2,
    comments: {
      comments: []
    },
  },
  {
    id: 2,
    author: 'Alexia23',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/3c/14/da/3c14da48f27e98c811899d9b6a4257d2.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 12,
    comments: {
      comments: []
    },
  },
  {
    id: 3,
    author: 'Michaelzzz',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/f6/de/81/f6de81c6bf0f0f05006a27bdfeafb6cd.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 0,
    comments: {
      comments: []
    },
  },
  {
    id: 4,
    author: 'Antonio_el_maestro',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/65/e4/00/65e40045bf22817e519c939bb4bc1fab.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 5,
    comments: {
      comments: []
    },
  },
  {
    id: 5,
    author: 'John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/7d/f6/c2/7df6c2256e3bc402ba7f095f12e631bc.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 2,
    comments: {
      comments: []
    },
  },
  {
    id: 6,
    author: 'adriana803',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/9f/62/2e/9f622e63aa6ffc044255aac9fdeb11da.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 9,
    comments: {
      comments: []
    },
  },
  {
    id: 7,
    author: 'Alexia23',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/6a/b0/21/6ab021568d92b46442c868bf7b24655c.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 12,
    comments: {
      comments: []
    },
  },
  {
    id: 8,
    author: 'Luis-alonso12',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/474x/8c/6b/94/8c6b94735f9d0f63fbeb23314737f461.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 7, comments: {
      comments: []
    },
  },
  {
    id: 9,
    author: 'michaelzzz',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/95/90/50/9590504c6e58a8899bd554e4018b33bd.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 4,
    comments: {
      comments: []
    },
  },
  {
    id: 10,
    author: 'antonio_el_maestro',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/a2/44/93/a244939c1f60cb0334ebd829037a3c63.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 2,
    comments: {
      comments: []
    },
  },
  {
    id: 11,
    author: 'william_8',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/8a/98/71/8a9871d60ce812a86851891787e04af5.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 8,
    comments: {
      comments: []
    },
  },
  {
    id: 12,
    author: 'luis_alonso',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/31/f4/df/31f4df361c592dc49aaca9ad5026538b.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 0,
    comments: {
      comments: []
    },
  },
  {
    id: 13,
    author: 'Alexia23',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/d0/19/b2/d019b29f1ae927b8fe8a6cccc1a806d4.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 5,
    comments: {
      comments: []
    },
  },
  {
    id: 14,
    author: 'John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/bd/6a/dc/bd6adcd84e724256ea468cd158287851.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 3,
    comments: {
      comments: []
    },
  },
  {
    id: 15,
    author: 'william_8',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://i.pinimg.com/236x/69/34/9d/69349df60fbd4f5d2625e86c9101b063.jpg',
    tags: ["nature", "art", "mode"],
    date: '25/03/2024',
    likes: 8,
    comments: {
      comments: []
    },
  },
] */