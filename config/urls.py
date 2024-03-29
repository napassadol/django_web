"""loffstore_admin URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from apps import views

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls')),

    # url(r'^datastore/register_harmonize', datastore_view.RegisterHarmonize.as_view()),
    # url(r'^datastore/get_column', datastore_view.GetColumn.as_view()),
    # url(r'^datastore/plot_data', datastore_view.PlotData.as_view()),
    # url(r'^datastore/plot_map', datastore_view.PlotMap.as_view()),

    url(r'^$', views.index),
    url(r'^check_session', views.check_session),
    url(r'^check_login', views.login),

    #company
    url(r'^company/list', views.getCompanyList),
    url(r'^company/edit', views.editCompany),
    url(r'^company/delete', views.deleteCompany),
    url(r'^company/add', views.addCompany),

    #product
    url(r'^product/list', views.getProductList)
]
