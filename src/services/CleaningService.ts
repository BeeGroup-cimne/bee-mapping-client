import AuthService from "./AuthService";
import ConfigService from "./ConfigService";
import axios from "axios";

class CleaningService {
    private authService = new AuthService();
    private configService = new ConfigService();

    create(data: string) {
        const headers = {
            'Authorization': 'Bearer ' + this.authService.hasCredentials()
        };

        return axios.post(this.configService.getConfig().api_url + '/cleaning/dataset', data, {headers: headers});

    }

}

export default CleaningService;