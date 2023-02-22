class AppConfig {

    public registerUrl = "http://localhost:4000/api/auth/register/";
    public loginUrl = "http://localhost:4000/api/auth/login/";
    public adminVacationsUrl = "http://localhost:4000/api/admin/vacations/";
    public adminReportsUrl = "http://localhost:4000/api/admin/reports/";
    public userVacationsUrl = "http://localhost:4000/api/users/vacations/";
    public adminVacationsImagesUrl = "http://localhost:4000/api/admin/vacations/images/";
    public userVacationsImagesUrl = "http://localhost:4000/api/users/vacations/images/";
    public followUrl = "http://localhost:4000/api/users/follow/";

}

const appConfig = new AppConfig()

export default appConfig;