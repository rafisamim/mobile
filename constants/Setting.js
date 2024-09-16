
import { AsyncStorage } from 'react-native';
const mainUrl = 'https://library.darakhtdanesh.org/'

export default {
  mainUrl,
  LoginUrl: mainUrl + 'api/login',
  SignUpUrl: mainUrl + 'api/register',
  DeleteUser:  mainUrl + 'api/user/delete',
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

