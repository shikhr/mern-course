import styled from 'styled-components';

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;

    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-weight: 700;
      text-align: center;
      span {
        color: var(--primary-500);
      }
    }
    p {
      color: var(--grey-600);
      margin-bottom: 3rem;
      text-align: center;
    }
    button {
      z-index: 3;
    }
  }

  .main-img {
    width: 100%;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -3rem;
    img {
      max-width: 500px;
    }
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      column-gap: 3rem;
      margin-top: -3rem;
    }
    .info {
      justify-content: center;
      align-items: flex-start;
      p,
      h1 {
        text-align: start;
      }
    }
    .main-img {
      margin: 0;
      padding: 0;
    }
  }
`;
export default Wrapper;
