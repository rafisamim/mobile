
import { AsyncStorage } from 'react-native';
const mainUrl = 'https://darakhtdanesh.org/'
//const mainUrl = 'http://127.0.0.1/ddl/'
//const mainUrl = 'http://localhost/ddl/'
//const mainUrl = 'http://192.168.1.122/ddl/'
//const mainUrl = 'http://192.168.0.115/ddl/'
//const mainUrl = 'http://192.168.137.111/ddl/'
//const mainUrl = 'http://172.20.10.3/ddl/'

export default {
  mainUrl,
  LoginUrl: mainUrl + 'api/login',
  SignUpUrl: mainUrl + 'api/register',
  s3Url: 'https://ddl-resources.s3-ap-southeast-1.amazonaws.com/resources/',
  swUrl: 'https://ddl.af/en/storyweaver/confirm/storyweaver_default',
  DDLFilesUrl: mainUrl + 'public/storage/files/',
  DDLAttachment: mainUrl + 'public/storage/',
  baseUrl: mainUrl,
  resourcesApi: mainUrl + 'api/resources/',
  resourceApi: mainUrl + 'api/resource_attributes/',
  resourceCategories: mainUrl + 'api/resource_categories/',
  featuredResources: mainUrl + 'api/featured_resources/',
  linksApi: mainUrl + 'api/links/',
  newsApi: mainUrl + 'api/news_list/',
  pageApi: mainUrl + 'api/page_view/',
  FileApi: mainUrl + 'api/resource/getFile/',
};
