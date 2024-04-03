<template>
  <div id="app">
  <nav class="navbar navbar-expand bg-primary navbar-dark p-2 sticky-top">
    <ul class="navbar-nav">
      <li class="nav-item">
  <RouterLink to="/users" class="nav-link">Users</RouterLink>
      </li>
      <li class="nav-item">
  <RouterLink to="/add" class="nav-link">Add User</RouterLink>
      </li>
    </ul>
  </nav>
  <RouterView />
  </div>
</template>