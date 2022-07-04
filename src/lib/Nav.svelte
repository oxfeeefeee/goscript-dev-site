<script>
  import { base } from "$app/paths";
</script>

<div>
  <nav>
    <a href="{base}/"><h3 class="home">Home</h3></a>
    <a href="{base}/blog"><h3 class="blog">Blog</h3></a>
  </nav>
</div>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h3 {
    margin-bottom: 0px;
    &.blog {
      color: #444;
    }
    &.home {
      color: #ff3e00;
    }
  }
</style>
