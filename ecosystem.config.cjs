module.exports = {
  apps: [
    {
      name: "encor-frontend",
      cwd: "/var/www/encor/frontend",
      script: "npm",
      args: "start -- -p 3000",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
