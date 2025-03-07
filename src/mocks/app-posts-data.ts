export interface IPost {
  caption: string;
  id: number;
  imageUrl: string;
  institution: {
    avatar: string | null;
    name: string;
  };
  updatedAt: string;
}

export const allPosts: IPost[] = [
  {
    id: 1,
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Universidade ABC',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeAgo: '2 hours ago',
  },
  {
    id: 2,
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Empresa XYZ',
    description: 'Sed euismod ligula in nunc bibendum, a eleifend quam congue.',
    timeAgo: '1 day ago',
  },
  {
    id: 3,
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Hospital ABC',
    description:
      'Aenean mattis odio sit amet purus gravida, sed vehicula arcu laoreet.',
    timeAgo: '3 days ago',
  },
  {
    id: 4,
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Escola XYZ',
    description: 'Vestibulum at justo nec ex hendrerit congue.',
    timeAgo: '4 days ago',
  },
  {
    id: 5,
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Companhia ABC',
    description: 'Phasellus nec libero a lorem ullamcorper dictum.',
    timeAgo: '5 days ago',
  },
];
