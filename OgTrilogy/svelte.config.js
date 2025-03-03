import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter({
      // Specify a supported runtime version:
      runtime: 'nodejs18.x'
    })
  }
};
