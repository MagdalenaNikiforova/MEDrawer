import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (


<div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="/src/wallpaper.jpg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Hello, we hope you're okay</h1>
        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" onClick={() => navigate("/daily")} class="btn btn-primary btn-lg px-4 me-md-2"><i class="fa-regular fa-calendar-days"></i> Daily</button>
          <button type="button" onClick={() => navigate("/weekly")} class="btn btn-outline-secondary btn-lg px-4"><i class="fa-regular fa-calendar-days"></i> Weekly</button>

          <button className="floating-btn btn-left btn btn-primary" onClick={() => navigate("/add-calendar")}>
                <i class="fa-regular fa-calendar"></i>
            </button>
            <button className="floating-btn btn btn-right btn-success" onClick={() => navigate("/add-medicine")}>
                <i class="fa-regular fa-plus"></i>
            </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
